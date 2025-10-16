const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());

// grid 
 document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const popupOverlay = document.getElementById('popupOverlay');
  const popupBox = document.getElementById('popupBox');
  const popupMainImage = document.getElementById('popupMainImage');
  const popupDetails = document.getElementById('popupDetails');
  const popupGallery = document.getElementById('popupGallery');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const text = card.getAttribute('data-text');
      const images = JSON.parse(card.getAttribute('data-images'));

      // Set main image & details
      popupMainImage.src = images[0];
      popupMainImage.alt = title;
      popupDetails.innerHTML = `<h2 id="popupTitle">${title}</h2><p>${text}</p>`;

      // Build gallery thumbnails
      popupGallery.innerHTML = '';
      images.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.alt = `${title} image ${index + 1}`;
        if (index === 0) thumb.classList.add('selected');
        thumb.addEventListener('click', () => {
          popupMainImage.src = imgSrc;
          popupGallery.querySelectorAll('img').forEach(img => img.classList.remove('selected'));
          thumb.classList.add('selected');
        });
        popupGallery.appendChild(thumb);
      });

      // Show popup
      popupOverlay.classList.add('active');
      popupOverlay.setAttribute('aria-hidden', 'false');

      // Focus popup for accessibility
      popupBox.focus();
    });
  });

  // Close popup on clicking outside the box
  popupOverlay.addEventListener('click', (e) => {
    if (!popupBox.contains(e.target)) {
      closePopup();
    }
  });

  // Prevent clicks inside popupBox from closing
  popupBox.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Close popup with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && popupOverlay.classList.contains('active')) {
      closePopup();
    }
  });

  function closePopup() {
    popupOverlay.classList.remove('active');
    popupOverlay.setAttribute('aria-hidden', 'true');
  }
});

// text - animations 
  document.addEventListener('DOMContentLoaded', function () {
    const rotatingText = document.getElementById('rotating-text');
    const phrases = ["Graphic Design", "Premium Printing", "Creative Branding", "Visual Identity"];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const pauseTime = 1500;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      let displayText;

      if (isDeleting) {
        charIndex--;
        displayText = currentPhrase.substring(0, charIndex);
      } else {
        charIndex++;
        displayText = currentPhrase.substring(0, charIndex);
      }

      rotatingText.textContent = displayText;

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, pauseTime);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 300);
      } else {
        setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed);
      }
    }

    // Start typing
    type();
  });






// animations
  document.addEventListener('DOMContentLoaded', () => {
      const container = document.querySelector('.animate-on-scroll');
      if (!container) return;

      const allEls = Array.from(container.querySelectorAll('*'));
      const elements = allEls.filter(el => {
        return !el.closest('#popupOverlay');
      });

      elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      });

      const animateElement = (el) => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      };

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateElement(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      });

      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
          animateElement(el);
        } else {
          observer.observe(el);
        }
      });
    });

// pre loader

// Hide preloader once page is fully loaded
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("hide");
});

// aboutus
document.addEventListener('DOMContentLoaded', () => {
  const texts = ["Your Vision", "Our Passion"];
  const typingSpeed = 150;
  const erasingSpeed = 100;
  const delayBetween = 1000;

  let textIndex = 0;
  let charIndex = 0;
  let isErasing = false;
  const typingElement = document.getElementById('typing');

  function type() {
    const currentText = texts[textIndex];

    if (!isErasing) {
      if (charIndex < currentText.length) {
        typingElement.textContent += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingSpeed);
      } else {
        isErasing = true;
        setTimeout(type, delayBetween);
      }
    } else {
      if (charIndex > 0) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(type, erasingSpeed);
      } else {
        isErasing = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, delayBetween);
      }
    }
  }

  type();
});

