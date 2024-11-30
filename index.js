    if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
  console.log('Browser up-to-date');
  });
}else{
if (navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
  console.log('Thanks for installing Abstech app!');
} else {
  iziToast.info({
          title: 'Browser Outdated',
          message: 'Kindly update your browser to the latest version!',
          position: 'topRight',
        });
  }

}
   
document.addEventListener('DOMContentLoaded', function () {
    // WhatsApp Contact
    document.getElementById('whatsapp').addEventListener('click', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value ? `*Name:* ${document.getElementById('name').value.trim()}\n` : '';
        const email = document.getElementById('email').value ? `*Email:* ${document.getElementById('email').value.trim()}\n` : '';
        const mess = document.getElementById('message').value?.trim() || 'Hi, *AbsTech*, I saw your portfolio and need your services for my business (please specify).';

        const message = `${name}${email}${mess}`;
        const allmessage = encodeURIComponent(message);

        window.open(`https://wa.me/2348069764769?text=${allmessage}`, "_blank");
    });

    // Phone Call
    document.getElementById('call').addEventListener('click', (e) => {
        e.preventDefault();
        window.open('tel:2348069764769', '_blank');
    });



document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const mess = document.getElementById('message').value?.trim() || 'Hi, AbsTech. I saw your portfolio and need your services for my business (please specify).';

    // Validate email
    if (!email || !validateEmail(email)) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a valid email address.',
            position: 'topRight',
        });
        return; // Stop execution if email is invalid
    }

    // Create the message
    const message = `${name ? `*Name:* ${name}\n` : ''}*Email:* ${email}\n${mess}`;

    // Show a loading notification
    iziToast.info({
        title: 'Sending',
        message: 'Your message is being sent...',
        timeout: 2000,
        position: 'topRight',
    });

    try {
        // Use the correct Netlify function endpoint
        const response = await fetch('https://abstech.netlify.app/.netlify/functions/sendMessage', {
            method: 'POST',
            mode: 'cors', // Explicitly set CORS mode
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (response.ok) {
            iziToast.success({
                title: 'Success',
                message: 'Your message was sent successfully!',
                position: 'topRight',
            });
        } else {
            const errorDetails = await response.text();
            throw new Error(`Failed to send message: ${errorDetails}`);
        }
    } catch (error) {
        console.error('Error:', error);
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while sending your message. Please try again.',
            position: 'topRight',
        });
    }
});

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
});

//PWA FEATURES 
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        iziToast.success({
          title: 'Downloading',
          message: 'Abstech app will be installed shortly. Thanks for your interest!',
          position: 'topRight',
        });
      } else {
        iziToast.info({
          title: 'Download Rejected',
          message: 'You can always install the app in your browser settings!',
          position: 'topRight',
        });
        installButton.style.display = 'none';
      }
      deferredPrompt = null;
    });
  });
});

//Web Share API
document.querySelectorAll('.share').forEach(button => {
  button.addEventListener('click', async function() {

    // Web Share API
    if (navigator.share) {
      await navigator.share({
        title: 'Discover Abstech: Your Ultimate Web Partner',
        text: "Looking for a reliable and cost-effective way to elevate your online presence? Abstech delivers cutting-edge websites with unbeatable service at the most affordable prices. I'm personally using Abstech to grow my online business, and the results speak for themselves. Don't miss out—check out their portfolio and see how they can transform your digital future today!",
        url: window.location.href,
      });
    }

  });
});

