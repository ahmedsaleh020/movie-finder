let input = document.querySelector("input");
let btn = document.querySelector("button");
let selectType = document.querySelector("select");
let container = document.querySelector(".container");
let loader = document.querySelector(".loader");
let detailsCard = document.querySelector(".more-details");
let movieCard;
let movieTitle =
  (movieGenre =
  moviePoster =
  movieRating =
  movieName =
  url =
    undefined);

btn.addEventListener("click", function () {
  if (input.value == "") {
    alert("Enter a Movie name");
  } else {
    movieName = input.value;
    url = `https://www.omdbapi.com/?apikey=6f111c03&t=${movieName}`;
    fetchData();
  }
});

function fetchData() {
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
          Plot,
          Year,
          Actors,
          Awards,
          Country,
          Rated,
          Language,
        } = data);
        // in case of movie poster is not exist .. display default poster
        if (moviePoster == "N/A") {
          moviePoster = "./default.jpeg";
        }
        displayData();
      } else if (data["Response"] == "False") {
        if (movieCard && movieCard.style) movieCard.style.display = "none";
        alert(`${data["Error"]}`);
      }
    })
    .catch((error) => {
      loader.style.display = "none";
      alert(`Error .. Try Again`);
      if (movieCard) movieCard.style.display = "none";
    });
}
function displayData() {
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
    <span>Type</span>
    <p>${Type}</p>
    <span>Year</span>
    <p>${Year}</p>
    <span>Country</span>
    <p>${Country}</p>
    <span>Languages</span>
    <p>${Language}</p>
    <a href="#" class='show-less'>Show Less</a>`;

    detailsCard.insertAdjacentHTML("afterbegin", details);
    detailsCard.style.transform = "scale(1)";
    let showLess = document.querySelector(".show-less");
    showLess.addEventListener("click", function () {
      detailsCard.style.transform = "scale(0)";
    });
  });
}
