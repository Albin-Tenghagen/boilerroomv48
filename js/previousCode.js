let articleArray = [];
//---------------------DOM FUNCTION--------------

const fetchApiResults = async (type = "all") => {
  try {
    console.log(type, " is responsive");
    articleSection.replaceChildren();
    let url;
    switch (type) {
      case "all":
        url =
          "https://newsapi.org/v2/top-headlines?country=us&language=en&apiKey=1006e9f332db40bd8553b27720785488";
        break;

      case "economy":
        url =
          "https://newsapi.org/v2/top-headlines?language=en&category=business&apiKey=1006e9f332db40bd8553b27720785488";
        break;

      default:
        url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          type
        )}&language=en&from=2024-11-5&sortBy=publishedAt&apiKey=1006e9f332db40bd8553b27720785488`;
        break;
    }

    const response = await fetch(url);

    if (!response.ok) {
      // Felhantering baserat på statuskod
      if (response.status === 400) {
        throw new Error("400: Bad Request");
      } else if (response.status === 401) {
        throw new Error("401: Unauthorized");
      } else if (response.status === 403) {
        throw new Error("403: Forbidden access");
      } else if (response.status === 404) {
        throw new Error("404: Resource not found");
      } else if (response.status === 429) {
        throw new Error("429: Too Many Requests");
      } else if (response.status === 500) {
        throw new Error("500: Internal Server Error");
      } else {
        throw new Error(`"HTTP error! Status: ${response.status}`);
      }
    }
    const data = await response.json();

    console.log("response : ", data);

    articleArray = data.articles;

    if (articleArray.length === 0) {
      articleSection.innerHTML = "<p>No articles were found<p>";
    } else {
      console.log("articleArray", articleArray);

      articleArray = await articleArray.filter(
        (article) => article?.content?.toLowerCase() !== "[removed]"
      );
      await articleArray.forEach((article) => {
        let articleContainer = document.createElement("article");
        articleContainer.setAttribute("class", "articleContainer");
        articleSection.appendChild(articleContainer);

        let articleTitle = document.createElement("h3");
        articleTitle.textContent = article.title;
        articleTitle.setAttribute("class", "articleTitle");
        articleContainer.appendChild(articleTitle);

        let articleSummary = document.createElement("p");
        articleSummary.setAttribute("class", "articleSummary");
        articleSummary.textContent = article.description;
        articleContainer.appendChild(articleSummary);

        let timeStamp = document.createElement("p");
        timeStamp.setAttribute("class", "timeStamp");
        // Formatera tidsstämpeln
        let publishedAt = article.publishedAt; // Exempel: "2024-11-22T15:30:00Z"
        let dateAndTime = publishedAt.replace("Z", "").split("T"); // Delar på "T" för att separera datum och tid
        let formattedTimeStamp = `${dateAndTime[0]} ${dateAndTime[1]}`; // Lägger till mellanrum mellan datum och tid
        timeStamp.textContent = formattedTimeStamp;
        articleContainer.appendChild(timeStamp);

        let articleAuthor = document.createElement("p");
        articleAuthor.setAttribute("class", "articleAuthor");
        articleAuthor.textContent = article.author;
        articleContainer.appendChild(articleAuthor);

        let articleImage = document.createElement("img");
        articleImage.setAttribute("class", "articleImage");

        article.urlToImage =
          article.urlToImage === null
            ? "https://placehold.co/600x400"
            : article.urlToImage;
        articleImage.src = article.urlToImage;
        articleContainer.append(articleImage);
        //

        //
        let readMoreButton = document.createElement("a");
        readMoreButton.textContent = "Read more";
        readMoreButton.setAttribute("class", "readMoreButton");
        readMoreButton.setAttribute("target", "_blank");
        readMoreButton.href = article.url;
        articleContainer.appendChild(readMoreButton);
      });
    }
  } catch (error) {
    console.error("Ett fel/error uppstod: ", error);
  }
};

//-----------------Header Creation------------------------------------------
let headerContainer = document.createElement("header");
headerContainer.setAttribute("class", "headerContainer");
document.body.appendChild(headerContainer);

let headingHeader = document.createElement("h1");
headingHeader.setAttribute("class", "headingHeader");
headingHeader.innerText = "Welcome to the latest news";
headerContainer.appendChild(headingHeader);

let techButton = document.createElement("button");
techButton.setAttribute("class", "techButton");
techButton.innerText = "Tech";
headerContainer.appendChild(techButton);

let appleButton = document.createElement("button");
appleButton.setAttribute("class", "appleButton");
appleButton.innerText = "Apple";
headerContainer.appendChild(appleButton);

let teslaButton = document.createElement("button");
teslaButton.setAttribute("class", "teslaButton");
teslaButton.innerText = "Tesla";
headerContainer.appendChild(teslaButton);

let economyButton = document.createElement("button");
economyButton.setAttribute("class", "economyButton");
economyButton.innerText = "Economy";
headerContainer.appendChild(economyButton);
//--------------------------------------------------------------------------

//------------Main Creation ------------------------------------------------
let newsContainer = document.createElement("main");
newsContainer.setAttribute("class", "newsContainer");
document.body.appendChild(newsContainer);

let searchForm = document.createElement("form");
searchForm.setAttribute("class", "searchForm");
newsContainer.appendChild(searchForm);

let searchNewsInput = document.createElement("input");
searchNewsInput.setAttribute("class", "searchNewsInput");
searchNewsInput.setAttribute("placeholder", "Search articles");
searchForm.appendChild(searchNewsInput);

let searchNewsButton = document.createElement("button");
searchNewsButton.setAttribute("class", "searchNewsButton");
searchNewsButton.innerText = "Search";
searchForm.appendChild(searchNewsButton);

let articleSection = document.createElement("section");
articleSection.setAttribute("class", "articleSection");
newsContainer.appendChild(articleSection);
//--------------------------------------------------------------------------

//----------------------Search function-------------------------------------

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchTerm = searchNewsInput.value;
  if (searchTerm.trim() === "") {
    console.log("Error, input is empty");
    searchNewsInput.setAttribute(
      "placeholder",
      "Input field can not be empty. Please try again."
    );
  } else {
    console.log("input is not empty, yay!");
    searchForArticles(searchTerm);
  }
});

async function searchForArticles(query) {
  await fetchApiResults(query);
}
//--------------------------------------------------------------------------

//------------------------Default News--------------------------------------
window.addEventListener("DOMContentLoaded", async function () {
  await fetchApiResults("all");
});
//--------------------------------------------------------------------------

//------------------Category Selection--------------------------------------

techButton.addEventListener("click", async function () {
  await fetchApiResults("tech");
});

appleButton.addEventListener("click", async function () {
  await fetchApiResults("apple");
});

teslaButton.addEventListener("click", async function () {
  await fetchApiResults("tesla");
});

economyButton.addEventListener("click", async function () {
  await fetchApiResults("economy");
});
//--------------------------------------------------------------------------
