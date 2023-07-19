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
                    var price = JSON.stringify(listing.price.total);
                    var rating = listing.rating;
                    var url = listing.url;
                    var description = JSON.stringify(listing.type);
                    var images = listing.images;
                    resultsHTML +=
                        "<h3 class='result-name' data-lng='" +
                        listing.lng +
                        "' data-lat='" +
                        listing.lat +
                        "'>" +
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
                    <p>URL: " +
                        url +
                        "</p>\
                    <hr>";

                    resultsContainer.innerHTML = resultsHTML;

                    const container =
                        document.getElementById("image-container");
                    container.innerHTML = "";

                    for (let i = 0; i < images.length; i++) {
                        const img = document.createElement("img");
                        img.src = images[i];
                        container.appendChild(img);
                    }
                }

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
