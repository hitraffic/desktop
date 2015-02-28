var mapLink = 
      '<a href="http://openstreetmap.org">OpenStreetMap</a>';
var baseLayer = L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; ' + mapLink,
      maxZoom: 18,
      });

//Heatmap test data
var testData = {
  max: 100,
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

//Display popup with mock data
var markers = [];

for (var i = 0; i < incidents.length; i++){
  var type = incidents[i].type;
  var lng = incidents[i].lng;
  var lat = incidents[i].lat;
  if (incidents[i].lng === null || incidents[i].lat === null){
    continue;
  }
  else{
    markers.push(L.marker([lat, lng]).addTo(map).bindPopup(type));
  } 
}

// Hovering markers for opening and closing popups
markers.forEach(function (e) {
  e.on('mouseover', function() {
    this.openPopup();
  });
});

markers.forEach(function (e) {
  e.on('mouseout', function() {
    this.closePopup();
  });
});

var markerLayer = L.layerGroup(markers);

//Filter between heatmap and markers
var overlaysMaps = {
  "Heatmap" : heatmapLayer,
  "Markers" : markerLayer
};

L.control.layers(overlaysMaps).addTo(map);

// Info box
var MyControl = L.Control.extend({
  options: {
      position: 'bottomleft'
  },

  onAdd: function (map) {
    // create the control container with a particular class name
    var container = L.DomUtil.create('div', 'my-custom-control');

    // ... initialize other DOM elements, add listeners, etc.
    container.innerHTML = "<h1>HI Traffic</h1>" + 
    "<ul><li>Bringing you the latest reported accidents and highest accident prone areas.</li>" + 
    "<li>Hover over the markers to view the accidents type.</li>" + 
    "<li>The heatmap shows areas with the most accidents.</li>" + 
    "<li>Hover over the icon on the top right corner to toggle between Markers and Heatmap.</li></ul>";

    return container;
  }
});

map.addControl(new MyControl());