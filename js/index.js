const itemsPerPage = 15;
let currentPage = 1;
let articleArray = [];
//  let intervalId = setInterval(() => {
//     fetchData()
//  }, (1000 * 60) * 5);

//--------------------------------------------------------------------------
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
      console.error("Ett fel/error uppstod: ", error);
    }
  };
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
    }
  });
  
  async function searchForArticles(query) {
    await fetchApiResults(query);
  }
  //--------------------------------------------------------------------------
  
  //-------------------Paging Setup--------------------------
  function displayData(page) {
    console.log(`Show data for page ${page}`)

    articleSection.innerHTML = '';

    const startingPage = (page -1) * startingPage;
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
