// var map = L.map('map').setView([21.4678, -157.9807], 11);
var mapLink = 
      '<a href="http://openstreetmap.org">OpenStreetMap</a>';
var baseLayer = L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; ' + mapLink,
      maxZoom: 18,
      });

var testData = {
  max: 5,
  data: [{lat: 21.297355, lng:-157.861581, count: 3},{lat: 21.412146, lng:-157.746353, count: 2}]
};

var cfg = {
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  "radius": 30,
  "maxOpacity": 1, 
  // scales the radius based on map zoom
  "scaleRadius": false, 
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries 
  //   (there will always be a red spot with useLocalExtremas true)
  "useLocalExtrema": true,
  // which field name in your data represents the latitude - default "lat"
  latField: 'lat',
  // which field name in your data represents the longitude - default "lng"
  lngField: 'lng',
  // which field name in your data represents the data value - default "value"
  valueField: 'count'
};

var heatmapLayer = new HeatmapOverlay(cfg);

var map = new L.Map('map', {
  center: new L.LatLng(21.4678, -157.9807),
  zoom: 11,
  layers: [baseLayer, heatmapLayer]
});

heatmapLayer.setData(testData);

var markers = [];

for (var i = 0; i < incidents.length; i++){
  var type = incidents[i].type;
  var lng = incidents[i].lng;
  var lat = incidents[i].lat;
  if (incidents[i].lng === null || incidents[i].lat === null){
    continue;
  }
  else{
    markers.push(L.marker([lat, lng],11).addTo(map).bindPopup(type));
  } 
}

// var markers = L.marker([21.4678, -157.9807], 11).addTo(map)
//     .bindPopup('Some crazy shit happened here, avoid this area at all costs.')
//     .openPopup();

// console.log(markers);
var marker = L.layerGroup(markers);

var baseMaps = {
  "Map" : baseLayer
};
var overlaysMaps = {
  "Heatmap" : heatmapLayer,
  "Popup" : marker
};

L.control.layers(baseMaps, overlaysMaps).addTo(map);

