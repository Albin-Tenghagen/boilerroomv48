//* API för bolisen.
//https://polisen.se/api/events

// Filtrering på plats (flera platser kan separeras med semikolon):

// /api/events?locationname=Stockholm;Järfälla

const fetchApiResults = async (type = "all") => {
    try {
      console.log(type, " is responsive");
      articleSection.replaceChildren();
      let requests = [];
      let url;
      switch (type) {
        case "all":
          url =
            "https://newsapi.org/v2/top-headlines?country=us&language=en&apiKey=1006e9f332db40bd8553b27720785488";
          break;
  
        case "combo":
          requests = [
            fetch(
              "https://newsapi.org/v2/top-headlines?country=us&language=en&apiKey=1006e9f332db40bd8553b27720785488"
            ),
            fetch(
              "https://newsapi.org/v2/top-headlines?language=en&category=business&apiKey=1006e9f332db40bd8553b27720785488"
            ),
          ];
          break;
  
        case "economy":
          url =
            "https://newsapi.org/v2/top-headlines?language=en&category=business&apiKey=1006e9f332db40bd8553b27720785488";
          break;
  
        default:
          url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
            type
          )}&language=en&from=2024-11-15&sortBy=publishedAt&apiKey=1006e9f332db40bd8553b27720785488`;
          break;
      }
    const policeRequests = fetch("https://polisen.se/api/events"); 

      if (requests.length > 0) {
        const [headlinesResponse, economyResponse] = await Promise.all(requests);
        
        if (!headlinesResponse.ok) {
          responseMessage(headlinesResponse);
        }
        if (!economyResponse.ok) {
          responseMessage(economyResponse);
        }
  
        const headlinesData = await headlinesResponse.json();
        const economyData = await economyResponse.json();
  
        articleArray = [...headlinesData.articles, ...economyData.articles];
      } else {
        const response = await fetch(url);
  
        if (!response.ok) {
          responseMessage(response);
        }
  
        const data = await response.json();
        articleArray = data.articles;
      }
  
      console.log("response : ", articleArray);
  
      if (articleArray.length === 0) {
        articleSection.innerHTML = "<p>No articles were found<p>";
      } else {
        console.log("articleArray", articleArray);
  
        articleArray = await articleArray.filter(
          (article) => article?.content?.toLowerCase() !== "[removed]"
        );
  
        updatePagination();
      }
    } catch (error) {
      showError("Ett fel uppstod ", error.message);
      console.error("Ett fel/error uppstod: ", error);
    }
  };