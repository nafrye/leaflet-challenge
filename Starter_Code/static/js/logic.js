// Creating the map object, zoomed out for view of the world
let myMap = L.map("map", {
    center: [40.8623, -73.6337],
    zoom: 2
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);


  
//URL for data of earthquakes in past day - 8/13/23
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

   // Define marker size
   function markerSize(magnitude) {
    return (magnitude + 10) * 10;
   }
  // Getting our GeoJSON data
  d3.json(link).then(function(data) {
  //  L.geoJson(data).addTo(myMap);

  
    //console.log(data.features[0].properties.mag);
    console.log(data.features);

    // add circles
    for (let i = 0; i < data.features.length; i++) {
      let location = [data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]];
      let magnitude = data.features[i].properties.mag;
      let circleSize = magnitude * 100000;
      let depth = data.features[i].geometry.coordinates[2];
      let place = data.features[i].properties.place;
      let circleColor = "";
      let depthColor = depth * 3;
      circleColor = (`rgb(255,${depthColor},50)`);

      L.circle(location, {
        radius: circleSize,
        fillOpacity: 0.75,
        color: circleColor,
        fillColor: circleColor
      }).bindPopup(`Location: ${place}, <br>Magnitude: ${magnitude}, <br>Depth: ${depth}`).addTo(myMap);
     
    }

//Legend specific
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Depth of Earthquake</h4>";
  div.innerHTML += '<i style="background: rgb(255,0,50)"></i><span>-10-10</span><br>';
  div.innerHTML += '<i style="background: rgb(255,60,50)"></i><span>10-30</span><br>';
  div.innerHTML += '<i style="background: rgb(255,120,50)"></i><span>30-50</span><br>';
  div.innerHTML += '<i style="background: rgb(255,180,50)"></i><span>50-70</span><br>';
  div.innerHTML += '<i style="background: rgb(255,240,50)"></i><span>70-90</span><br>';
  div.innerHTML += '<i style="background: rgb(255,270,50)"></i><span>90+</span><br>';
  
  

  return div;
};

legend.addTo(myMap);




    });

