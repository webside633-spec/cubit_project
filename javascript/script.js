const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());


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

    html += `
      <div class="card" style=" position: relative; display: inline-block;">
        <a href="${link}" target="_blank" style="text-decoration:none; color:inherit; display:block; position: relative;">
          <img src="../images/${img}"  />
          <div class="card_overlay card_overlay--blur">
            <div class="card_title">${title}</div>
            <div class="card_text">${description}</div>
          </div>
        </a>
      </div>
    `;
  });

  // Clear float or use flexbox container
  html += '<br style="clear:both;">';

  document.getElementById('result').innerHTML = html;
}

window.onload = shuffle;
