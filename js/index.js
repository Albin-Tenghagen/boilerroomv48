// appleButton.addEventListener("click", async function fetchApple() {
//     try {
//         console.log("appleButton is responsive")
//         articleSection.replaceChildren();
//         const response = await fetch('https://newsapi.org/v2/everything?q=apple&language=en&from=2024-11-5&sortBy=publishedAt&apiKey=1006e9f332db40bd8553b27720785488')
//         const appleData = await response.json();
//         console.log("response : ", appleData);
//         (data => {
//             console.log(data)
//             articleArray = data.articles
        
//             if(articleArray.length === 0) {
//               articleSection.innerHTML = '<p>No articles were found<p>'
//             } else {
        
//             console.log("articleArray", articleArray )
//             articleArray.forEach(article => {
//               let articleContainer = document.createElement("article")
//               articleContainer.setAttribute("class", "articleContainer")
//               articleSection.appendChild(articleContainer)
        
//               let articleTitle = document.createElement("h3")
//               articleTitle.textContent =  article.title
//               articleTitle.setAttribute("class", "articleTitle")
//               articleContainer.appendChild(articleTitle) 
        
//               let articleSummary = document.createElement("p")
//               articleSummary.setAttribute("class", "articleSummary")
//               articleSummary.textContent = article.description;
//               articleContainer.appendChild(articleSummary)
        
//               let timeStamp = document.createElement("p")
//               timeStamp.setAttribute("class", "timeStamp")
//               // Formatera tidsstämpeln
//               let publishedAt = article.publishedAt // Exempel: "2024-11-22T15:30:00Z"
//               let dateAndTime = publishedAt.replace("Z", "").split("T") // Delar på "T" för att separera datum och tid
//               let formattedTimeStamp = `${dateAndTime[0]} ${dateAndTime[1]}` // Lägger till mellanrum mellan datum och tid
//               timeStamp.textContent = formattedTimeStamp
//               articleContainer.appendChild(timeStamp)
              
//               let articleAuthor = document.createElement("p")
//               articleAuthor.setAttribute("class", "articleAuthor")
//               articleAuthor.textContent = article.author;
//               articleContainer.appendChild(articleAuthor)
            
//               let articleImage = document.createElement("img")
//               articleImage.setAttribute("class", "articleImage")
              
//               articleImage.src = article.urlToImage    
//               articleContainer.append(articleImage)
        
//               let readMoreButton = document.createElement("a")
//                 readMoreButton.textContent = "Read more"
//                 readMoreButton.setAttribute("class", "readMoreButton")
//                 readMoreButton.setAttribute("target", "_blank")
//                 readMoreButton.href = article.url
//                 articleContainer.appendChild(readMoreButton)
//             });
//           }
//         })


//         if (!response.ok) {
//          if (response.status === 404) {
//            throw new Error('404: Resource not found');
//          } else {
//            throw new Error(`HTTP error! Status: ${response.status}`);
//          }

//     }} catch (error) {
        
//     }
    

// })





    // //
    // // Check if the URL is valid, use a fallback image otherwise
    // if (article.urlToImage) {
    //     articleImage.src = article.urlToImage;
    //   } else {
    //     articleImage.src = 'css/bild001.jpg' // Replace with your fallback image path
    //   }
      
    //   // Add an alt attribute for accessibility
    //   articleImage.alt = article.title || "Fallback image for missing article";
      
    //   // Handle image loading errors (e.g., if the API provides a broken URL)
    //   articleImage.onerror = function () {
    //     this.src = 'css/bild001.jpg'; // Replace with your fallback image path
    //     this.alt = "Fallback image for missing article";
    // articleContainer.append(articleImage);


    // //    // Check if the URL is valid, use a fallback image otherwise
    // if (article.urlToImage) {
    //     articleImage.src = article.urlToImage;
    //   } else {
    //     articleImage.src = 'css/bild001.jpg' // Replace with your fallback image path
    //   }
      
    //   // Add an alt attribute for accessibility
    //   articleImage.alt = article.title || "Fallback image for missing article";
      
    //   // Handle image loading errors (e.g., if the API provides a broken URL)
    //   articleImage.onerror = function () {
    //     this.src = 'css/bild001.jpg'; // Replace with your fallback image path
    //     this.alt = "Fallback image for missing article";
    //   };
      
    //   articleContainer.append(articleImage);


    appleButton.addEventListener("click", async function() {
        try {
            console.log("appleButton is responsive")
            articleSection.replaceChildren();
            const response = await fetch('https://newsapi.org/v2/everything?q=apple&language=en&from=2024-11-5&sortBy=publishedAt&apiKey=1006e9f332db40bd8553b27720785488')
            
            if (!response.ok) {
              // Felhantering baserat på statuskod
              if (response.status === 400) {
                  throw new Error('400: Bad Request')
              } else if (response.status === 401) {
                  throw new Error('401: Unauthorized')
              } else if (response.status === 403) {
                  throw new Error('403: Forbidden access')
              } else if (response.status === 404) {
                  throw new Error('404: Resource not found')
              } else if (response.status === 429) {
                  throw new Error('429: Too Many Requests')
              } else if (response.status === 500) {
                  throw new Error('500: Internal Server Error')
              } else {
                  throw new Error(`"HTTP error! Status: ${response.status}`)
              }
            }
              const data = await response.json();
      
              console.log("response : ", data);
      
            
              articleArray = data.articles
          
              if(articleArray.length === 0) {
                articleSection.innerHTML = '<p>No articles were found<p>'
              } else {
          
              console.log("articleArray", articleArray )
      
              await articleArray.forEach(article => {
                let articleContainer = document.createElement("article")
                articleContainer.setAttribute("class", "articleContainer")
                articleSection.appendChild(articleContainer)
          
                let articleTitle = document.createElement("h3")
                articleTitle.textContent =  article.title
                articleTitle.setAttribute("class", "articleTitle")
                articleContainer.appendChild(articleTitle) 
          
                let articleSummary = document.createElement("p")
                articleSummary.setAttribute("class", "articleSummary")
                articleSummary.textContent = article.description;
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
          //
       
          //
                let readMoreButton = document.createElement("a")
                  readMoreButton.textContent = "Read more"
                  readMoreButton.setAttribute("class", "readMoreButton")
                  readMoreButton.setAttribute("target", "_blank")
                  readMoreButton.href = article.url
                  articleContainer.appendChild(readMoreButton)
              });
            } 
            
      
      
        } catch (error) {
            console.error("Ett fel/error uppstod: ", error)
            
        }
      })
      



      // tech    let apiUrl = `https://newsapi.org/v2/everything?q=tech&language=en&from=2024-11-05&sortBy=publishedAt&apiKey=1006e9f332db40bd8553b27720785488`;
 
   // Fetches data from apiUrl
   //fetch(apiUrl)

      // tesla      fetch('https://newsapi.org/v2/everything?q=tesla&language=en&from=2024-11-5&sortBy=publishedAt&apiKey=1006e9f332db40bd8553b27720785488')

      // economy fetch('https://newsapi.org/v2/top-headlines?language=en&category=business&apiKey=1006e9f332db40bd8553b27720785488')