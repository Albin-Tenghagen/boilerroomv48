
//*--------------------Global variabels-------------------------------------
const itemsPerPage = 15;
let currentPage = 1;
let articleArray = [];
 let intervalId = setInterval(() => {
    fetchApiResults()
 }, (1000 * 60) * 5);

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

let errorContainer = document.createElement("div")
errorContainer.setAttribute("id", "errorContainer")
newsContainer.appendChild(errorContainer)

let articleSection = document.createElement("section");
articleSection.setAttribute("class", "articleSection");
newsContainer.appendChild(articleSection);
//--------------------------------------------------------------------------

//-----------------------------FETCH----------------------------------------
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
            "https://newsapi.org/v2/top-headlines?language=en&category=business&apiKey=1006e9f332db40bd8553b2772078548";
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
            articleArray = data.articles;
            
            console.log("response : ", data);
            
            
            if (articleArray.length === 0) {
                articleSection.innerHTML = "<p>No articles were found<p>";
            } else {
                console.log("articleArray", articleArray);
                
                articleArray = await articleArray.filter(
                    (article) => article?.content?.toLowerCase() !== "[removed]"
                );
                
            updatePagination()
      }
    } catch (error) {
      showError( "Ett fel uppstod " ,error.message);
      console.error("Ett fel/error uppstod: ", error);
    }
  };
  //------------------------Default News--------------------------------------
window.addEventListener("DOMContentLoaded", async function () {
    await fetchApiResults("all");
    document.querySelector('.searchNewsInput').value = '';
  });
  //--------------------------------------------------------------------------
  
  //------------------Category Selection--------------------------------------
  
  techButton.addEventListener("click", async function () {
    currentPage = 1;
    await fetchApiResults("tech");
    document.querySelector('.searchNewsInput').value = '';
  
  });
  
  appleButton.addEventListener("click", async function () {
    currentPage = 1;
    await fetchApiResults("apple");
    document.querySelector('.searchNewsInput').value = '';
  });
  
  teslaButton.addEventListener("click", async function () {
    currentPage = 1;
    await fetchApiResults("tesla");
    document.querySelector('.searchNewsInput').value = '';
  });
  
  economyButton.addEventListener("click", async function () {
    currentPage = 1;
    await fetchApiResults("economy");
    document.querySelector('.searchNewsInput').value = '';
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
      document.querySelector('.searchNewsInput').value = '';


    }
  });
  
  async function searchForArticles(query) {
    currentPage = 1;
    await fetchApiResults(query);
  }
  //--------------------------------------------------------------------------
  
  //-------------------Paging Setup--------------------------
  function displayData(page) {
    console.log(`Show data for page ${page}`)

    articleSection.innerHTML = '';

    const startingPage = (page -1) * itemsPerPage;
    console.log("starting page:", startingPage)
    const endingPage = startingPage + itemsPerPage;
    console.log("ending page:", endingPage)
    const paginatedData = articleArray.slice(startingPage, endingPage)
    console.log("paginated data: ", paginatedData)

    paginatedData.forEach((article) => createArticles(article))
    
}

function paginationSetup() {
    //* Takes the array of data and divides it with how many itmesPerPage we wanted
    const amountOfPages = Math.ceil(articleArray.length / itemsPerPage);
    console.log("pages count: ", amountOfPages)

    const pageControls = document.createElement("article")
    pageControls.setAttribute("class", "pageControls")
    articleSection.appendChild(pageControls)
    
    //* when a prevButton or Next button is clicked. it checks if it is on the last 
    const prevButton = document.createElement("button")
     prevButton.textContent = "Previous Page"
     prevButton.setAttribute("class", "prevButton")    
     pageControls.appendChild(prevButton)
     prevButton.addEventListener("click", ( ) => {
        if(currentPage > 1){
            currentPage--;
            console.log("current page: ", currentPage)
            updatePagination()
        } else {
            console.log("Could not go back")
        }
     })

    const pageButton = document.createElement("button");
    pageButton.setAttribute("class", "pageButton");
    pageButton.textContent = `${currentPage} / ${amountOfPages}`
    pageControls.appendChild(pageButton)

     const nextButton = document.createElement("button")
     nextButton.setAttribute("class", "nextButton")
     nextButton.textContent = "Next page"
     pageControls.appendChild(nextButton)
     nextButton.addEventListener("click", () => {
        if(currentPage < amountOfPages) {
            currentPage++;
            console.log("current page: ", currentPage)
            updatePagination()
        }

     })
}

//------------------Page Refresh function------------------
function updatePagination(){
    displayData(currentPage)
    paginationSetup()
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
}
//------------------------------------------------------------
function responseMessage(response){
    switch (response.status) {
        case 400:    
            throw new Error('400: Bad Request');
        case 401:
            throw new Error('401: Unauthorized');
        case 403:
            throw new Error('403: Forbidden access');
        case 404:
            throw new Error('404: Resource not found');
        case 429:
            throw new Error('429: Too Many Requests');
        case 500:
            throw new Error('500: Internal Server Error');
        default:
            throw new Error(`"HTTP error! Status: ${response.status}`);
        }
    }


//------------------------------------------------------------

function showError(...messages) {
  // Get the error container
  const errorContainer = document.getElementById('errorContainer');
  const fullMessage = messages.join('');
  // Set the error message
  errorContainer.textContent = fullMessage;

  // Show the container
  errorContainer.style.display = 'block';

  // Optionally, hide the error after a few seconds
  setTimeout(() => {
      errorContainer.style.display = 'none';
      errorContainer.textContent = ''; // Clear the error message
  }, 5000); // Adjust the duration (5000ms = 5 seconds) as needed
}