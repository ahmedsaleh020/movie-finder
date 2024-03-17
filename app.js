let input = document.querySelector("input");
let searchBtn = document.querySelector(".search-btn");
let DownloadBtn = document.querySelector(".download-btn");
let subtitles = document.querySelector(".subtitles");
let container = document.querySelector(".container");
let loader = document.querySelector(".loader");
let detailsCard = document.querySelector(".more-details");
let downloadLinks = document.querySelector(".download-links");
let downloadCards = document.querySelector(".download-cards");
let closeBtn = document.querySelector(".close");
let movieCard, movId;
let movieTitle =
  (movieGenre =
  moviePoster =
  movieRating =
  movieName =
  url =
    undefined);
// search btn
searchBtn.addEventListener("click", function () {
  if (input.value == "") {
    alert("Enter a Movie name");
  } else {
    movieName = input.value;
    url = `https://www.omdbapi.com/?apikey=6f111c03&t=${movieName}&type=movie&plot=full`;
    fetchMovieDetails();
  }
});
// download links btn
let downloadBtn = document.querySelector(".download-btn");
downloadBtn.addEventListener("click", function () {
  fetch(`https://yts.mx/api/v2/movie_details.json?imdb_id=${movId}`)
    .then((res) => res.json())
    .then((dat) => {
      let links = dat.data.movie.torrents;
      // display the links page
      downloadLinks.style.scale = "1";
      if (links) {
        downloadCards.innerHTML = "";
        for (const { size, quality, url } of links) {
          let downloadCard = `<div class="download-card flex">
          <span>Quality : ${quality}</span>
          <span>Size : ${size}</span>
          <a href="${url}">Download</a>
        </div>`;
          downloadCards.insertAdjacentHTML("beforeend", downloadCard);
        }
      } else {
        downloadCards.innerHTML = "";
        let message = `<div class='download-links-err-msg'>No Download Links Available For This Movie Now</div>`;
        downloadCards.insertAdjacentHTML("beforeend", message);
      }
    })
    .catch((error) => {
      loader.style.display = "none";
      alert(`Error .. Check Internet and Try Again`);
      downloadBtn.style.display = "none";
      subtitles.style.display = "none";
      if (movieCard) movieCard.style.display = "none";
    });
  // hide the links page
  closeBtn.addEventListener("click", function () {
    downloadLinks.style.scale = "0";
  });
});
function fetchMovieDetails() {
  loader.style.display = "inline-block";
  input.value = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      loader.style.display = "none";
      if (data["Response"] == "True") {
        ({
          Poster: moviePoster,
          Title: movieTitle,
          imdbRating: movieRating,
          Genre: movieGenre,
          Type,
          Runtime,
          Plot,
          Year,
          Actors,
          Awards,
          Country,
          Rated,
          Language,
          imdbID,
        } = data);
        movId = imdbID;
        // in case of movie poster is not exist .. display default poster
        if (moviePoster == "N/A") {
          moviePoster = "./default.jpeg";
        }
        displayMovieDetails();
      } else if (data["Response"] == "False") {
        if (movieCard && movieCard.style) movieCard.style.display = "none";
        alert(`${data["Error"]}`);
        downloadBtn.style.display = "none";
        subtitles.style.display = "none";
      }
    })
    .catch((error) => {
      loader.style.display = "none";
      alert(`Error .. Try Again`);
      if (movieCard) movieCard.style.display = "none";
      downloadBtn.style.display = "none";
      subtitles.style.display = "none";
    });
}
function displayMovieDetails() {
  downloadBtn.style.display = "grid";
  subtitles.style.display = "grid";
  subtitles.href = `https://yifysubtitles.ch/movie-imdb/${movId}`;
  container.innerHTML = "";
  const card = `<div class="movie-card flex">
<img src=${moviePoster} />
<div class="movie-details flex">
  <h2 class="movie-title">${movieTitle}</h2>
  <p class="movie-rating"><i class="bx bxs-star"></i><br/>${movieRating} / 10</p>
  <p class="movie-genre">${
    Type[0].toUpperCase() + Type.slice(1)
  } Genre : <br/>${movieGenre.replaceAll(",", " -")}</p>
  <button class='show-more'>Show More</button>
  </div>
  </div>`;
  container.insertAdjacentHTML("afterbegin", card);
  movieCard = document.querySelector(".movie-card");
  // show more btn
  let showMore = document.querySelector(".show-more");
  showMore.addEventListener("click", function () {
    detailsCard.innerHTML = "";
    let details = ` <h2>${movieTitle}</h2>
    <span>Plot</span>
    <p>
    ${Plot}
    </p>
    <span>Actors</span>
    <p>${Actors}</p>
    <span>Awards</span>
    <p>${Awards}</p>
    <span>Rated</span>
    <p>${Rated}</p>
    <span>Duration</span>
    <p>${Runtime}</p>
    <span>Year</span>
    <p>${Year}</p>
    <span>Country</span>
    <p>${Country}</p>
    <span>Languages</span>
    <p>${Language}</p>
    <a href="#" class='show-less'>Show Less</a>`;
    detailsCard.insertAdjacentHTML("afterbegin", details);
    detailsCard.style.transform = "scale(1)";
    // show less btn
    let showLess = document.querySelector(".show-less");
    showLess.addEventListener("click", function () {
      detailsCard.style.transform = "scale(0)";
    });
  });
}