// API : VGfMFonq_geo6ZQfTPtcAVHRsn1qjGvTZA4AV6J1kaw;

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMore = document.getElementById("show-more");
const notFound = document.getElementById("notFound");
const accessKey = "VGfMFonq_geo6ZQfTPtcAVHRsn1qjGvTZA4AV6J1kaw";

let keyword = "";
let page = 1;

async function searchImage() {
  keyword = searchBox.value.trim();
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  results = data.results;
  if (results.length === 0) {
    notFound.classList.remove("hidden");
    searchResult.classList.add("hidden");
  }

  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);

    searchResult.appendChild(imageLink);
  });
  if (results.length > 0) {
    showMore.style.display = "block";
    notFound.classList.add("hidden");
    searchResult.classList.remove("hidden");
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  keyword = searchBox.value.trim();
  if (keyword.length <= 0) {
    alert("Enter a Proper Value");
    return;
  } else {
    page = 1;
    searchImage();
  }
});

showMore.addEventListener("click", (e) => {
  e.preventDefault();
  page++;
  searchImage();
});
