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



// random image generater 

const allImages = [
      "image1.jpeg",
      "image2.jpeg",
      "image3.jpeg",
      "image4.jpeg",
      "image5.jpeg",
      "image6.jpeg",
      "image7.jpeg",
      "image8.jpeg",
      "image9.jpeg",
      "image10.jpeg"
    ];

    const imageLinks = {
      "image1.jpeg": "page1.html",
      "image2.jpeg": "page2.html",
      "image3.jpeg": "page3.html",
      "image4.jpeg": "page4.html",
      "image5.jpeg": "page5.html",
      "image6.jpeg": "page6.html",
      "image7.jpeg": "page7.html",
      "image8.jpeg": "page8.html",
      "image9.jpeg": "page9.html",
      "image10.jpeg": "page10.html"
    };

    const titles = {
      "image1.jpeg": "Title 1",
      "image2.jpeg": "Title 2",
      "image3.jpeg": "Title 3",
      "image4.jpeg": "Title 4",
      "image5.jpeg": "Title 5",
      "image6.jpeg": "Title 6",
      "image7.jpeg": "Title 7",
      "image8.jpeg": "Title 8",
      "image9.jpeg": "Title 9",
      "image10.jpeg": "Title 10"
    };

    const descriptions = {
      "image1.jpeg": "Description 1",
      "image2.jpeg": "Description 2",
      "image3.jpeg": "Description 3",
      "image4.jpeg": "Description 4",
      "image5.jpeg": "Description 5",
      "image6.jpeg": "Description 6",
      "image7.jpeg": "Description 7",
      "image8.jpeg": "Description 8",
      "image9.jpeg": "Description 9",
      "image10.jpeg": "Description 10"
    };

    const imagesToShow = 9;

    function shuffle() {
      let shownImages = JSON.parse(localStorage.getItem("shownImages")) || [];
      let remainingImages = allImages.filter(img => !shownImages.includes(img));

      if (remainingImages.length < imagesToShow) {
        shownImages = [];
        remainingImages = [...allImages];
      }

      const selectedImages = [];
      while (selectedImages.length < imagesToShow) {
        const randomIndex = Math.floor(Math.random() * remainingImages.length);
        const img = remainingImages[randomIndex];
        if (!selectedImages.includes(img)) {
          selectedImages.push(img);
          remainingImages.splice(randomIndex, 1);
        }
      }

      shownImages = shownImages.concat(selectedImages);
      localStorage.setItem("shownImages", JSON.stringify(shownImages));

      let html = "";
      selectedImages.forEach(img => {
        const link = imageLinks[img] || "#";
        const title = titles[img] || "";
        const description = descriptions[img] || "";

        const popupImages = [
          `../images/${img}`,
          `../images/${img.replace('.jpeg', '_2.jpeg')}`,
          `../images/${img.replace('.jpeg', '_3.jpeg')}`
        ];

        html += `
          <div class="card" tabindex="0"
               data-title="${title}"
               data-text="${description}"
               data-images='${JSON.stringify(popupImages)}'>
            <a href="${link}" style="text-decoration:none; color:inherit; display:block;">
              <img src="../images/${img}" alt="${title}" />
              <div class="card_overlay card_overlay--blur">
                <div class="card_title">${title}</div>
                <div class="card_text">${description}</div>
              </div>
            </a>
          </div>
        `;
      });

      html += '<br style="clear:both;">';
      document.getElementById('result').innerHTML = html;
    }

    function openPopup(card) {
      const title = card.getAttribute('data-title');
      const text = card.getAttribute('data-text');
      const images = JSON.parse(card.getAttribute('data-images'));

      const popupOverlay = document.getElementById('popupOverlay');
      const popupBox = document.getElementById('popupBox');
      const popupMainImage = document.getElementById('popupMainImage');
      const popupDetails = document.getElementById('popupDetails');
      const popupGallery = document.getElementById('popupGallery');

      popupMainImage.src = images[0];
      popupMainImage.alt = title;
      popupDetails.innerHTML = `<h2>${title}</h2><p>${text}</p>`;

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

      popupOverlay.classList.add('active');
      popupOverlay.setAttribute('aria-hidden', 'false');
      popupBox.focus();
    }

    function closePopup() {
      const popupOverlay = document.getElementById('popupOverlay');
      popupOverlay.classList.remove('active');
      popupOverlay.setAttribute('aria-hidden', 'true');
    }

    window.addEventListener('load', () => {
      shuffle();

      const resultContainer = document.getElementById('result');
      const popupOverlay = document.getElementById('popupOverlay');
      const popupBox = document.getElementById('popupBox');

      resultContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (!card) return;
        // Prevent the link navigation (anchor inside card)
        e.preventDefault();
        openPopup(card);
      });

      popupOverlay.addEventListener('click', (e) => {
        if (!popupBox.contains(e.target)) {
          closePopup();
        }
      });

      popupBox.addEventListener('click', e => {
        e.stopPropagation();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && popupOverlay.classList.contains('active')) {
          closePopup();
        }
      });
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

