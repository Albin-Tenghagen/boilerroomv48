appleButton.addEventListener("click", async function fetchApple() {
    try {
        console.log("appleButton is responsive")
        articleSection.replaceChildren();
        const response = await fetch('https://newsapi.org/v2/everything?q=apple&language=en&from=2024-11-5&sortBy=publishedAt&apiKey=1006e9f332db40bd8553b27720785488')
        const appleData = await response.json();
        console.log("response : ", appleData);
        
        if (!response.ok) {
         if (response.status === 404) {
           throw new Error('404: Resource not found');
         } else {
           throw new Error(`HTTP error! Status: ${response.status}`);
         }
        
    }} catch (error) {
        
    }
    

})
