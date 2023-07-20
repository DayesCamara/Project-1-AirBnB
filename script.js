mapboxgl.accessToken =
    "pk.eyJ1IjoiaGFpbGJsYWNrc25vdyIsImEiOiJjbGs3ZGQyaHIwNzBwM2ttbHNjbWNreWc1In0.E4B5dGLFeJxEPMYwuRq8vQ";

var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: [-110, 45],
    zoom: 1,
});

var marker1 = new mapboxgl.Marker({
    color: "Red",
    rotation: 45,
    draggable: true, // Set marker1 draggable
})
    .setLngLat([-110, 45])
    .addTo(map);

var marker2 = new mapboxgl.Marker({
    draggable: true, // Set marker2 draggable
})
    .setLngLat([-112, 42])
    .addTo(map);

map.addControl(new mapboxgl.FullscreenControl(), "top-right");
map.addControl(new mapboxgl.NavigationControl(), "top-right");

var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: "metric",
    profile: "mapbox/driving",
});
map.addControl(directions, "top-left");




document
    .getElementById("searchForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("click");
        var locationInput = document.getElementById("locationInput").value;
        var CheckinInput = document.getElementById("CheckinInput").value;
        var CheckoutInput = document.getElementById("CheckoutInput").value;
        var AdultsInput = document.getElementById("AdultsInput").value;
        var ChildrenInput = document.getElementById("ChildrenInput").value;
        var InfantsInput = document.getElementById("InfantsInput").value;
        var PetsInput = document.getElementById("PetsInput").value;
        var CurrencyInput = document.getElementById("CurrencyInput").value;
        
        var settings = {
            async: true,
            crossDomain: true,
            url:
                "https://airbnb13.p.rapidapi.com/search-location?location=" +
                locationInput +
                "&checkin=" +
                CheckinInput +
                "&checkout=" +
                CheckoutInput +
                "&adults=" +
                AdultsInput +
                "&children=" +
                ChildrenInput +
                "&infants=" +
                InfantsInput +
                "&pets=" +
                PetsInput +
                "&page=" +
                PageInput +
                "&currency=" +
                CurrencyInput,
            method: "GET",
            headers: {
                "X-RapidAPI-Key":
                    "bcdeb201e7msh2f4cbf739838312p1ae01bjsn0bb54cdbcc98",
                "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
            },
        };

        fetch(settings.url, { headers: settings.headers })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var resultsContainer = document.getElementById("resultsContainer");
                var listings = data.results;
                var resultsHTML = "";
                for (var i = 0; i < listings.length; i++) {
                    var listing = listings[i];
            
                        
                    resultsHTML +=
                    
                    `<div class="results">
                        <div class = "image">
                            <img src="${listing.images[0]}" >
                        </div>
                        <div class = "text">
                            <h2>${listing.name}</h2>
                            <p>Price: ${JSON.stringify(listing.price.rate)}</p>
                            <p>Description: ${JSON.stringify(listing.type)}</p>
                            <p>Coordinates: ${listing.lng}, ${listing.lat}</p>
                            <div class="url"><a href=${listing.url}>URL:${listing.url}</a></div>
                            <br></br>
                        </div>
                        </div>`;
                    
                    
                    document.getElementById("resultsContainer").style.display="block";

                    resultsContainer.innerHTML = resultsHTML;



                
                }

                console.log(data.results);

                // Add click event listener to each result name
                var resultNames =
                    document.getElementsByClassName("result-name");
                for (var j = 0; j < resultNames.length; j++) {
                    resultNames[j].addEventListener("click", function () {
                        var lng = parseFloat(this.dataset.lng);
                        var lat = parseFloat(this.dataset.lat);

                        // Set the map center and zoom to the selected location
                        map.flyTo({ center: [lng, lat], zoom: 12 });

                        // Add a marker at the selected location
                        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
                    });
                }
            })
            .catch(function (error) {
                console.error(
                    "An error occurred during the API request.",
                    error
                );
            });

    




    });
 