document
    .getElementById("searchForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        var locationInput = document.getElementById("locationInput").value;
        var settings = {
            async: true,
            crossDomain: true,
            url:
                "https://airbnb13.p.rapidapi.com/search-location?location=" +
                locationInput +
                "&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD",
            method: "GET",
            headers: {
                "X-RapidAPI-Key":
                    "e08aca1624mshfe12c89aee25588p1c3f28jsnf213b9105837",
                "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
            },
        };
        fetch(settings.url, { headers: settings.headers })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var resultsContainer = document.getElementById("results");
                var listings = data.results;
                var resultsHTML = "";
                for (var i = 0; i < listings.length; i++) {
                    var listing = listings[i];
                    var name = listing.name;
                    var price = listing.price;
                    var rating = listing.rating;
                    var description = listing.description;
                    resultsHTML +=
                        "\
          <h3>Name: " +
                        name +
                        "</h3>\
          <p>Price: " +
                        price +
                        "</p>\
          <p>Rating: " +
                        rating +
                        "</p>\
          <p>Description: " +
                        description +
                        "</p>\
          <hr>\
        ";
                }
                resultsContainer.innerHTML = resultsHTML;
            })
            .catch(function (error) {
                console.error(
                    "An error occurred during the API request.",
                    error
                );
            });
    });