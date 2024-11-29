console.log("JavaScript file loaded correctly")

//--------------------Paging function----------------------
const apiUrl = 'https://jsonplaceholder.typicode.com/posts'
const itemsPerPage = 15;
let currentPage = 1;
let dataArray = [];
 let intervalId = setInterval(() => {
    fetchData()
 }, (1000 * 60) * 5);


async function fetchData() {
    try {
        const response = await fetch(apiUrl)
     
        dataArray = await response.json();
        
        console.log("Data fetched correctly, yay!")
        
        updatePagination()
        // paginationSetup()
    }
    catch (error) {
        
        console.error("Error fetching the data: ", error)
    
    }
}
//---------------------------------------------------------

//------------------Data display---------------------------
function displayData(page) {
    console.log(`Show data for page ${page}`)

    articleSection.innerHTML = '';

    const startingPage = (page -1) * startingPage;
    console.log("starting page:", startingPage)
    const endingPage = startingPage + itemsPerPage;
    console.log("ending page:", endingPage)
    const paginatedData = dataArray.slice(startingPage, endingPage)
    console.log("paginated data: ", paginatedData)

    paginatedData.forEach((article) => createArticles(article))
    
}

//---------------------------------------------------------


//-------------------Paging Setup--------------------------

function paginationSetup() {
    //* Takes the array of data and divides it with how many itmesPerPage we wanted
    const amountOfPages = Math.ceil(dataArray.length / itemsPerPage);
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

//---------------------------------------------------------

//------------------Page Refresh function------------------
function updatePagination(){
    displayData(currentPage)
    paginationSetup()
}
fetchData()

//---------------------------------------------------------

//------------------Article Creation Function--------------
function createArticles(article) {
    let articleContainer = document.createElement("article")
    articleContainer.setAttribute("class", "articleContainer")
    articleSection.appendChild(articleContainer)

    let articleTitle = document.createElement("h3")
    articleTitle.textContent =  article.title || "no title found"
    articleTitle.setAttribute("class", "articleTitle")
    articleContainer.appendChild(articleTitle) 

    let articleSummary = document.createElement("p")
    articleSummary.setAttribute("class", "articleSummary")
    articleSummary.textContent = article.body || "No summary found";
    articleContainer.appendChild(articleSummary)

    let timeStamp = document.createElement("p")
    timeStamp.setAttribute("class", "timeStamp")
    // Formatera tidsstämpeln
    let publishedAt = article.publishedAt // Exempel: "2024-11-22T15:30:00Z"
    let dateAndTime = publishedAt.replace("Z", "").split("T") // Delar på "T" för att separera datum och tid
    let formattedTimeStamp = `${dateAndTime[0]} ${dateAndTime[1]}` // Lägger till mellanrum mellan datum och tid
    timeStamp.textContent = formattedTimeStamp
    articleContainer.appendChild(timeStamp)
    
    let articleAuthor = document.createElement("p")
    articleAuthor.setAttribute("class", "articleAuthor")
    articleAuthor.textContent = article.author;
    articleContainer.appendChild(articleAuthor)
  
    let articleImage = document.createElement("img")
    articleImage.setAttribute("class", "articleImage")
    articleImage.src = article.urlToImage    
    articleContainer.append(articleImage)

    let readMoreButton = document.createElement("a")
      readMoreButton.textContent = "Read more"
      readMoreButton.setAttribute("class", "readMoreButton")
      readMoreButton.setAttribute("target", "_blank")
      readMoreButton.href = article.url
      articleContainer.appendChild(readMoreButton)
}
//------------------------------------------------------------


//?Felhanterings function som kan kallas på en response

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

