// We creat the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We creat the dark view tile layer that will be an option for our map.
let satellitestreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

//Creat a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satellitestreets
};

// Create the map objects with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [43.7,-79.3],
    zoom: 11,
    layers: [satellitestreets],
});
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);
//ACCESSING THE AIRPORT geoJSON
let torontoHood = 'https://raw.githubusercontent.com/PriscillaVD77/Mapping_Earthquakes/main/torontoNeighborhoods.json'

//Grabbing our GeoJSON data
d3.json(torontoData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retwieved data
    L.geoJson(data, 
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("<h2> Airline: " + feature.properties.airline + "</h2> <hr> <h3> Destination: " + feature.properties.dst + "</h3>");}
        
}).addTo(map);})