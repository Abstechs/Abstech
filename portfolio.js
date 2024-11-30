// Check if Service Worker is supported and register it
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

// JavaScript for toggling project description visibility
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const description = card.querySelector('.project-description');
      description.style.display = (description.style.display === 'block') ? 'none' : 'block';
    });
  });

  // For smooth scroll
  window.toView = function (element) {
    document.querySelector(element).scrollIntoView({ behavior: 'smooth' });
  };

  // Footer year
  document.getElementById('year').innerHTML = new Date().getFullYear();

  // Render graphics dynamically
  renderGraphics();
});

// Images array with 35 objects
var images = [
  { src: 'g1.jpg', description: 'An elegant, sparkling and stunning birthday flyer for Jimoh Ridwanullahi', color: 'text-gray-500' },
  { src: 'g2.jpg', description: 'An elegant, sparkling and stunning birthday flyer for Maryam' },
  { src: 'g3.jpg', description: 'Cool stunning campaign poster for Tejidini' },
  { src: 'g4.jpg', description: 'My first designed birthday graphics' },
  { src: 'g5.png', description: 'Clean, aesthetic Certificate designed for Best Option' },
  { src: 'g6.jpg', description: 'Small sticker for Asiyah Naming Ceremony, perfect for Mug' },
  { src: 'g7.jpg', description: 'Wedding flyer for Olusosun family - wine color' },
  { src: 'g8.jpg', description: 'Wedding flyer for Olusosun family - variant color' },
  { src: 'g9.jpg', description: 'Wedding flyer for Olusosun family - black color' },
  { src: 'g10.jpg', description: 'Affiliate Marketer flyer for Coach Adeola Inc Abstech' },
  { src: 'g11.jpg', description: 'Peace Data flyer for pricing list' },
  { src: 'g12.jpg', description: 'Printable 4x4 passport' },
  { src: 'g13.png', description: 'Abstech campaign flyer for free course' },
  { src: 'g14.jpg', description: 'Easily printable Passport design' },
  { src: 'g15.jpg', description: 'Birthday design for use in frame' },
  { src: 'g16.jpg', description: 'Framed Birthday design, print by S.Tejidini' },
  { src: 'g17.jpg', description: 'Binta Madinah small chop design' },
  { src: 'g18.jpg', description: 'Binta Madinah in packaged box' },
  { src: 'g19.jpg', description: 'Elegant perfume flyer for AY scent bar' },
  { src: 'g20.jpg', description: 'Cover page for Web development book' },
  { src: 'g21.jpg', description: 'Simple book mock-up for Web dev' },
  { src: 'g22.jpg', description: 'Certificate of participation by FRSC/NYSC to Khadijat Memorial School' },
  { src: 'g23.jpg', description: 'Certificate of participation by FRSC/NYSC to Al-Amin Islamic College' },
  { src: 'g24.jpg', description: 'Certificate of participation by FRSC/NYSC to Alaran Group of School' },
  { src: 'g25.jpg', description: 'Certificate of participation by FRSC/NYSC to Covenant Victory College' },
  { src: 'g26.jpg', description: 'Poojuh exchange, flyer for social use • Pinky' },
  { src: 'g27.jpg', description: 'Poojuh exchange, flyer for social use • Yellowish' },
  { src: 'g28.jpg', description: 'Abs exchange, flyer for social use' },
  { src: 'g29.jpg', description: 'Nikky Smart Data, pricing list • Green' },
  { src: 'g30.jpg', description: 'Nikky Smart Data, pricing list • w/b' },
  { src: 'g31.jpg', description: 'Sabtech Network Marketing flyer' },
  { src: 'g32.jpg', description: 'Muhyideen College of Ed. Student receipt design' },
  { src: 'g33.png', description: 'Muhyideen College of Ed. Student result design' },
  { src: 'g34.jpg', description: 'Olaufe Catering Services' },
  { src: 'g35.png', description: 'Tuns Food, located at Iwo Road, Ibadan' }
];

// Function to inject images dynamically
function renderGraphics() {
  var container = document.getElementById('graphics');

  images.forEach((img, index) => {
    const description = img.description || 'Graphic design by Abstech';
    const color = img.color || 'text-gray-600';

    // Dynamic HTML template
    var project = `
      <div class="group relative bg-white rounded-xl shadow-lg overflow-hidden project-card hover:scale-105 transition-all duration-300" data-index="${index}" style="margin-bottom:4px;">
        <img src="./graphics/${img.src}" alt="Abstech Graphics" class="w-full h-56 object-cover">
        <div class="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-all duration-500"></div>
        <div class="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 text-white transition-all duration-300">
          <a href="#" class="bg-indigo-600 px-6 py-3 rounded-full shadow-lg preview-btn">View Project</a>
        </div>
        <div class="absolute bottom-0 p-4 text-sm ${color} project-description">
          <p>Graphics • ${description}</p>
        </div>
      </div>
    `;

    // Append the project card to the container
    container.innerHTML += project;
  });
}

// Event delegation for dynamic content
document.getElementById('graphics').addEventListener('click', function (event) {
  if (event.target.classList.contains('preview-btn')) {
    event.preventDefault();

    const projectCard = event.target.closest('.project-card');
    const index = projectCard.getAttribute('data-index');
    const img = images[index];

    // Display the modal using Swal.fire
    Swal.fire({
      title: 'Graphic design by Abstech',
      text: img.description || 'Preview of the selected project',
      imageUrl: `./graphics/${img.src}`,
      imageAlt: 'Abstech Graphics',
      confirmButtonText: 'Close'
    });
  }
});

// PWA Features
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

// Web Share API
document.querySelectorAll('.share').forEach(button => {
  button.addEventListener('click', async function () {
    if (navigator.share) {
      await navigator.share({
        title: 'Discover Abstech: Your Ultimate Web Partner',
        text: "Looking for a reliable and cost-effective way to elevate your online presence? Abstech delivers cutting-edge websites with unbeatable service at the most affordable prices. I'm personally using Abstech to grow my online business, and the results speak for themselves. Don't miss out—check out their portfolio and see how they can transform your digital future today!",
        url: window.location.href,
      });
    }
  });
});
