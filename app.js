class giphyApp {
  constructor() {
    this.search = "";
    this.animalTags = ["dog", "cat", "rabbit"];
  }

  populateTags() {
    document.getElementById("tags-container").innerHTML = "";
    this.animalTags.map(tag => {
      let tagsContainer = document.getElementById("tags-container");
      let button = document.createElement("button");
      button.setAttribute("id", tag);
      button.setAttribute("style", "margin: 10px; margin-left: 0px;");
      button.innerHTML = tag;
      button.addEventListener("click", this.animalTagClick);
      tagsContainer.append(button);
    });
  }

  displayImage(element) {
    let stillUrl = element.images.fixed_width_still.url;
    let loopingUrl = element.images.fixed_width.url;
    let imageRating = element.rating;
    let resultContainer = document.getElementById("result-container");
    let image = document.createElement("img");
    let rating = document.createElement("FIGCAPTION");
    let imageContainer = document.createElement("div");
    rating.textContent = `rating: ${imageRating}`;
    rating.setAttribute("style", "text-align: center;");
    imageContainer.setAttribute("class", "order-md-1");
    image.setAttribute("src", stillUrl);
    image.setAttribute("data-state", "still");
    image.setAttribute("data-animate", loopingUrl);
    image.setAttribute("data-still", stillUrl);
    image.setAttribute("style", "padding-right: 10px; height: 250px;");
    image.addEventListener("click", this.animateGif);
    resultContainer.append(imageContainer);
    imageContainer.append(image);
    imageContainer.append(rating);
  }

  animalTagClick() {
    event.preventDefault();
    let removeActive = document.querySelectorAll("button");
    for (let i = 0; i < removeActive.length; i++) {
      removeActive[i].className = "";
    }
    this.search = event.currentTarget.id;
    giphyAW(this.search);
    this.setAttribute("class", "active");
  }

  animateGif() {
    let dataState = event.currentTarget.dataset.state;
    let dataStill = event.currentTarget.dataset.still;
    let dataAnimate = event.currentTarget.dataset.animate;
    if (dataState === "still") {
      this.setAttribute("src", dataAnimate);
      this.setAttribute("data-state", "animate");
    } else {
      this.setAttribute("src", dataStill);
      this.setAttribute("data-state", "still");
    }
  }
}

async function giphyAW(search) {
  document.getElementById("result-container").innerHTML = "";
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=AUKbW19nf9ikTy5BT1ZgIg4OXz1a3VAR&limit=10`
  );
  const data = await response.json();
  const gifArray = data.data;
  Array.from(gifArray).forEach(function(element) {
    giphyApp.displayImage(element);
  });
}

function initiateApp() {
  giphyApp.populateTags();
  document.addEventListener("submit", function(event) {
    event.preventDefault();
    this.search = document
      .getElementById("search-input")
      .value.toLowerCase()
      .trim();
    if (
      giphyApp.animalTags.includes(this.search) === false &&
      this.search !== ""
    ) {
      giphyApp.animalTags.push(this.search);
    }
    giphyApp.populateTags();
    giphyAW(this.search);
    document.getElementById("search-input").value = "";
  });
}
document.addEventListener("DOMContentLoaded", function() {
  giphyApp = new giphyApp();
  initiateApp();
});
