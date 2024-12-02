//*--------------------Global variables-------------------------------------
const itemsPerPage = 15;
let currentPage = 1;
let articleArray = [];
let policeArticleArray = [];
let cancelSource = null;  // Declare a global variable to store the cancel token
let lastTopic = "";  // Variable to track the last topic clicked by the user
let intervalId = setInterval(() => {
  fetchApiResults();
}, 1000 * 60 * 5);

//*-------------------------------------------------------------------------
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

let topHeadlinesButton = document.createElement("button");
topHeadlinesButton.setAttribute("class", "topHeadlinesButton");
topHeadlinesButton.innerText = "TopHeadlines";
headerContainer.appendChild(topHeadlinesButton);
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

let errorContainer = document.createElement("div");
errorContainer.setAttribute("id", "errorContainer");
newsContainer.appendChild(errorContainer);

let articleSection = document.createElement("section");
articleSection.setAttribute("class", "articleSection");
newsContainer.appendChild(articleSection);

const section2Header = document.createElement("h1");
section2Header.setAttribute("class", "section2Header");
section2Header.innerText = "Swedish news from the police:";
newsContainer.appendChild(section2Header);

const articleSection2 = document.createElement("section");
articleSection2.setAttribute("class", "articleSection2");
newsContainer.appendChild(articleSection2);

//--------------------------------------------------------------------------

//-----------------------------FETCH----------------------------------------


const fetchApiResults = async (type = "all") => {
  // Check if the user clicked the same topic as before
  if (type === lastTopic) {
    console.log(`Already fetching results for "${type}"`);
    showError(`Already fetching results for "${type}"`);
    return; // Deny API call if the topic is the same
  }

  // Cancel any ongoing request
  if (cancelSource) {
    cancelSource.cancel("Request cancelled due to a new one.");
  }

  // Create a new CancelToken for the new request
  cancelSource = axios.CancelToken.source();
  
  try {
    console.log(type, "is responsive");
    articleSection.replaceChildren();
    articleSection2.replaceChildren();
    
    let requests = [];
    let url;


    switch (type) {
      case "topHeadlines":
        url = "https://newsapi.org/v2/top-headlines?country=us&language=en&apiKey=1006e9f332db40bd8553b27720785488";
        break;
      case "all":
        requests = [
          axios.get("https://newsapi.org/v2/top-headlines?country=us&language=en&apiKey=1006e9f332db40bd8553b27720785488", { cancelToken: cancelSource.token }),
          axios.get("https://newsapi.org/v2/top-headlines?language=en&category=business&apiKey=1006e9f332db40bd8553b27720785488", { cancelToken: cancelSource.token }),
          axios.get("https://polisen.se/api/events", { cancelToken: cancelSource.token }),
        ];
        break;
      case "economyCategory":
        url = "https://newsapi.org/v2/top-headlines?language=en&category=business&apiKey=1006e9f332db40bd8553b27720785488";
        break;
      default:
        url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(type)}&language=en&from=2024-11-15&sortBy=publishedAt&apiKey=1006e9f332db40bd8553b27720785488`;
        break;
    }

    // Perform API request(s)
    if (type === "all") {
      // Use await to wait for all API requests
      const [headlinesResponse, economyResponse, policeResponse] = await Promise.all(requests);
      
      articleArray = [
        ...headlinesResponse.data.articles,
        ...economyResponse.data.articles,
      ];
      policeArticleArray = policeResponse.data;

      // Check if we have police articles and create these articles
      if (policeArticleArray.length === 0) {
        articleSection2.innerHTML = "<p>No articles were found<p>";
      } else {
        const limitedPoliceArticles = policeArticleArray.slice(0, 20);
        limitedPoliceArticles.forEach((article2) => createArticles2(article2));
      }

      // If we don't find any articles, show a message
      if (articleArray.length === 0) {
        articleSection.innerHTML = "<p>No articles were found<p>";
      } else {
        articleArray = articleArray.filter((article) => article?.content?.toLowerCase() !== "[removed]");
        updatePagination();  // Update pagination when articles are fetched
      }
    } else {
      // If the type is not "all", make a single API request
      const response = await axios.get(url, { cancelToken: cancelSource.token });
      articleArray = response.data.articles;
      if (articleArray.length === 0) {
        articleSection.innerHTML = "<p>No articles were found<p>";
      } else {
        articleArray = articleArray.filter((article) => article?.content?.toLowerCase() !== "[removed]");
        updatePagination();  // Update pagination when articles are fetched
      }
    }

    // Update lastTopic to prevent repeated requests
    lastTopic = type;

  } catch (error) {
    // Handle cancellation error
    if (axios.isCancel(error)) {
      console.log("Request cancelled:", error.message);
      showError("Request cancelled:", error.message)
    } else {
      showError("An error occurred: ", error.response?.statusText || error.message);
      console.error(error);
    }
  }
};

window.addEventListener("DOMContentLoaded", async function () {
  await fetchApiResults("all");
  document.querySelector(".searchNewsInput").value = "";
});

// Event listeners for buttons
techButton.addEventListener("click", async function () {
  currentPage = 1;
  document.querySelector(".section2Header").style.display = "none";
  await fetchApiResults("tech");
  document.querySelector(".searchNewsInput").value = "";
});

appleButton.addEventListener("click", async function () {
  currentPage = 1;
  document.querySelector(".section2Header").style.display = "none";
  await fetchApiResults("apple");
  document.querySelector(".searchNewsInput").value = "";
});

teslaButton.addEventListener("click", async function () {
  currentPage = 1;
  document.querySelector(".section2Header").style.display = "none";
  await fetchApiResults("tesla");
  document.querySelector(".searchNewsInput").value = "";
});

economyButton.addEventListener("click", async function () {
  currentPage = 1;
  document.querySelector(".section2Header").style.display = "none";
  await fetchApiResults("economyCategory");
  document.querySelector(".searchNewsInput").value = "";
});

topHeadlinesButton.addEventListener("click", async function () {
  currentPage = 1;
  document.querySelector(".section2Header").style.display = "none";
  await fetchApiResults("topHeadlines");
  document.querySelector(".searchNewsInput").value = "";
});


//---------------------------------------------------------

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
    document.querySelector(".searchNewsInput").value = "";
    document.querySelector(".section2Header").style.display = "none";
  } 
});

async function searchForArticles(query) {
  currentPage = 1;
  await fetchApiResults(query);
}
//--------------------------------------------------------------------------

//-------------------Paging Setup--------------------------
function displayData(page) {
  console.log(`Show data for page ${page}`);

  articleSection.innerHTML = "";

  const startingPage = (page - 1) * itemsPerPage;
  console.log("starting page:", startingPage);
  const endingPage = startingPage + itemsPerPage;
  console.log("ending page:", endingPage);
  const paginatedData = articleArray.slice(startingPage, endingPage);
  console.log("paginated data: ", paginatedData);

  paginatedData.forEach((article) => createArticles(article));
}

function paginationSetup() {
  //* Takes the array of data and divides it with how many itmesPerPage we wanted
  const amountOfPages = Math.ceil(articleArray.length / itemsPerPage);
  console.log("pages count: ", amountOfPages);

  const pageControls = document.createElement("article");
  pageControls.setAttribute("class", "pageControls");
  articleSection.appendChild(pageControls);

  //* when a prevButton or Next button is clicked. it checks if it is on the last
  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous Page";
  prevButton.setAttribute("class", "prevButton");
  pageControls.appendChild(prevButton);
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      console.log("current page: ", currentPage);
      updatePagination();
    } else {
      console.log("Could not go back");
    }
  });

  const pageButton = document.createElement("button");
  pageButton.setAttribute("class", "pageButton");
  pageButton.textContent = `${currentPage} / ${amountOfPages}`;
  pageControls.appendChild(pageButton);

  const nextButton = document.createElement("button");
  nextButton.setAttribute("class", "nextButton");
  nextButton.textContent = "Next page";
  pageControls.appendChild(nextButton);
  nextButton.addEventListener("click", () => {
    if (currentPage < amountOfPages) {
      currentPage++;
      console.log("current page: ", currentPage);
      updatePagination();
    }
  });
}

//------------------Page Refresh function------------------
function updatePagination() {
  displayData(currentPage);

  paginationSetup();
}
//---------------------------------------------------------
//------------------Article Creation Function--------------
function createArticles(article) {
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
  // Format timestamp
  let publishedAt = article.publishedAt; // Exampel: "2024-11-22T15:30:00Z"
  let dateAndTime = publishedAt.replace("Z", "").split("T"); // Divides "T" to seperate date and time
  let formattedTimeStamp = `${dateAndTime[0]} ${dateAndTime[1]}`; // Places a blank space between date and time
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
}
//------------------------------------------------------------
//------------------Article2 Creation Function--------------

function createArticles2(article2) {

  
  let articleContainer2 = document.createElement("article");
  articleContainer2.setAttribute("class", "articleContainer");
  articleSection2.appendChild(articleContainer2);

  let articleTitle2 = document.createElement("h3");
  articleTitle2.textContent = article2.name;
  articleTitle2.setAttribute("class", "articleTitle");
  articleContainer2.appendChild(articleTitle2);

  let articleSummary2 = document.createElement("p");
  articleSummary2.setAttribute("class", "articleSummary");
  articleSummary2.textContent = article2.summary;
  articleContainer2.appendChild(articleSummary2);

  let timeStamp2 = document.createElement("p");
  timeStamp2.setAttribute("class", "timeStamp");
  timeStamp2.textContent = article2.datetime;
  articleContainer2.appendChild(timeStamp2);

  let articleAuthor2 = document.createElement("p");
  articleAuthor2.setAttribute("class", "articleAuthor");
  articleAuthor2.textContent = article2.id;
  articleContainer2.appendChild(articleAuthor2);
}

//------------------ShowError funciton-----------------
function showError(...messages) {
  // Get the error container
  const errorContainer = document.getElementById("errorContainer");
  const fullMessage = messages.join("");
  // Set the error message
  errorContainer.textContent = fullMessage;

  // Show the container
  errorContainer.style.display = "block";

  // Optionally, hide the error after a few seconds
  setTimeout(() => {
    errorContainer.style.display = "none";
    errorContainer.textContent = ""; // Clear the error message
  }, 5000); // Adjust the duration (5000ms = 5 seconds) as needed
}

//------------------------------------------------------------