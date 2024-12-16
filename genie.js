(function ($) {
  if (typeof $ === "undefined") {
    const script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.6.4.min.js";
    script.onload = () => initializeFormGenie();
    document.head.appendChild(script);
  } else {
    initializeFormGenie();
  }

  function initializeFormGenie() {
    const capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const includeCSS = (url) => {
      if (!$(`link[href="${url}"]`).length) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        document.head.appendChild(link);
      }
    };

    const includeJS = (url, callback) => {
      if (!$(`script[src="${url}"]`).length) {
        const script = document.createElement("script");
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
      } else {
        callback();
      }
    };

    const includeLibraries = (options) => {
      const { theme } = options;

      // Include theme CSS based on selected option
      if (theme === "tailwind") {
        includeCSS("https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css");
      } else if (theme === "bootstrap") {
        includeCSS("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
      }

      // Include common CSS and JS libraries
      includeCSS("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");
      includeCSS("https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css");
      includeCSS("https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css");
      includeJS("https://cdn.jsdelivr.net/npm/iziToast@1.4.0/dist/iziToast.min.js", () => {});
      includeJS("https://cdn.jsdelivr.net/npm/sweetalert2@11.0.0/dist/sweetalert2.all.min.js", () => {});
    };

    window.FormGenie = {
      create: function (config) {
        const defaults = {
          container: null,
          fields: [],
          order: [],
          theme: "tailwind",
          submitText: "Submit",
          validateOnSubmit: true,
          additionalCSS: "",
          animation: "genie-fade-in",
          onSuccess: null,
          customURL: null,
        };

        const options = $.extend({}, defaults, config);

        if (!options.container || !$(options.container).length) {
          console.error("FormGenie: Invalid container specified!");
          return;
        }

        this.injectCSS(options);
        this.buildForm(options);
        includeLibraries(options);
      },

      injectCSS: function (options) {
        const { theme, additionalCSS } = options;

        // Theme CSS Injection
        if (theme === "bootstrap") {
          includeCSS("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
        } else if (theme === "tailwind") {
          includeCSS("https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css");
        }

        // Inject any additional CSS if provided
        if (additionalCSS) {
          const styleTag = document.createElement("style");
          styleTag.innerHTML = additionalCSS;
          document.head.appendChild(styleTag);
        }

        this.includeAnimationCSS();
      },

      includeAnimationCSS: function () {
        const styleTag = document.createElement("style");
        styleTag.innerHTML = `
          .genie-fade-in {
            animation: genie-fade-in 0.5s ease-in-out;
          }
          .genie-fade-out {
            animation: genie-fade-out 0.5s ease-in-out;
          }
          @keyframes genie-fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes genie-fade-out {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
        `;
        document.head.appendChild(styleTag);
      },

      buildForm: function (options) {
        const { container, fields, order, theme, submitText, validateOnSubmit, animation, onSuccess, customURL } = options;
        const mergedFields = this.mergeFields(this.defaultFields, fields);
        const orderedFields = order.length ? order : mergedFields.map((f) => f.name);
        const classes = theme === "tailwind" ? this.tailwindClasses : this.bootstrapClasses;

        let formHTML = `<form class="${classes.form}">`;

        orderedFields.forEach((fieldName) => {
          const field = mergedFields.find((f) => f.name === fieldName);
          if (!field) return;
          const {
            name,
            type = "text",
            label = capitalize(field.name),
            placeholder = "",
            required = false,
            options = [],
            class: customClass = "",
            attributes = {},
            multiple = false,
          } = field;

          const attrString = Object.entries(attributes)
            .map(([key, value]) => `${key}="${value}"`)
            .join(" ");

          switch (type) {
            case "textarea":
              formHTML += `<div class="${classes.group} ${customClass}"><label for="${name}" class="${classes.label}">${label}</label><textarea id="${name}" name="${name}" placeholder="${placeholder}" class="${classes.input} ${animation}" ${attrString} ${required ? "required" : ""}></textarea></div>`;
              break;
            case "select":
              formHTML += `<div class="${classes.group} ${customClass}"><label for="${name}" class="${classes.label}">${label}</label><select id="${name}" name="${name}" class="${classes.input} ${animation}" ${multiple ? "multiple" : ""} ${attrString} ${required ? "required" : ""}>${options
                .map((opt) => `<option value="${opt.value}">${opt.label}</option>`)
                .join("")}</select></div>`;
              break;
            case "checkbox":
            case "radio":
              formHTML += `<div class="${classes.group} ${customClass}"><label class="${classes.label}">${label}</label>${options
                .map(
                  (opt) =>
                    `<div><input type="${type}" name="${name}" value="${opt.value}" class="${classes.checkbox} ${animation}" ${attrString} ${required ? "required" : ""}><label>${opt.label}</label></div>`
                )
                .join("")}</div>`;
              break;
            default:
              formHTML += `<div class="${classes.group} ${customClass}"><label for="${name}" class="${classes.label}">${label}</label><input type="${type}" id="${name}" name="${name}" placeholder="${placeholder}" class="${classes.input} ${animation}" ${attrString} ${required ? "required" : ""}></div>`;
          }
        });

        formHTML += `<button type="submit" class="${classes.button} ${animation}">${submitText}</button></form>`;
        $(container).html(formHTML);

        if (validateOnSubmit) {
          this.attachValidation($(container).find("form"), onSuccess, customURL);
        }
      },

      defaultFields: [
        { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", required: true },
        { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter your phone number", required: true },
        { name: "password", label: "Password", type: "password", placeholder: "Enter your password", required: true },
        { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Re-enter your password", required: false },
      ],

      mergeFields: function (defaultFields, customFields) {
        const fieldMap = {};
        [...defaultFields, ...customFields].forEach((field) => {
          fieldMap[field.name] = { ...fieldMap[field.name], ...field };
        });
        return Object.values(fieldMap);
      },

      attachValidation: function ($form, onSuccess, customURL) {
        $form.on("submit", (e) => {
          e.preventDefault();
          let isValid = true;
          $form.find("[required]").each(function () {
            const $input = $(this);
            const value = $input.val();
            $input.removeClass("formgenie-invalid");

            if (!value.trim()) {
              isValid = false;
              $input.addClass("formgenie-invalid");
            } else if ($input.attr("type") === "email" && !/\S+@\S+\.\S+/.test(value)) {
              isValid = false;
              $input.addClass("formgenie-invalid");
            } else if ($input.attr("name") === "phone" && !/^\+?\d{10,15}$/.test(value)) {
              isValid = false;
              $input.addClass("formgenie-invalid");
            }
          });

          if (isValid) {
            // Submit form or make an AJAX call
            if (customURL) {
              $.ajax({
                url: customURL,
                method: "POST",
                data: $form.serialize(),
                success: function (response) {
                  if (onSuccess) onSuccess(response);
                  iziToast.success({
                    message: "Form submitted successfully",
                    position: "topRight",
                  });
                },
                error: function (error) {
                  iziToast.error({
                    message: "Error submitting form",
                    position: "topRight",
                  });
                },
              });
            } else if (onSuccess) {
              onSuccess($form.serialize());
              iziToast.success({
                message: "Form submitted successfully",
                position: "topRight",
              });
            }
          } else {
            iziToast.error({
              message: "Please fill all required fields correctly",
              position: "topRight",
            });
          }
        });
      },

      tailwindClasses: {
        form: "space-y-4",
        group: "flex flex-col",
        label: "text-sm font-semibold text-gray-700",
        input: "p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700",
        checkbox: "mr-2",
        button: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700",
      },

      bootstrapClasses: {
        form: "form-group",
        group: "mb-3",
        label: "form-label",
        input: "form-control",
        button: "btn btn-primary w-100",
        checkbox: "form-check-input",
      },
    };
  }
})(jQuery);
