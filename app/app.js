var map = L.map('map').setView([21.4678, -157.9807], 11);
    mapLink = 
      '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; ' + mapLink,
      maxZoom: 18,
      }).addTo(map);

// To add a css marker for something at long/lat
// L.marker([21.4678, -157.9807], 11).addTo(map)
//     .bindPopup('Some crazy shit happened here, avoid this area at all costs.')
//     .openPopup();


for (var i = 0; i < incidents.length; i++){
  if (incidents[i].lng === null || incidents[i].lat === null){
    continue;
  } 
  var type = incidents[i].type;
  var lng = incidents[i].lng;
  var lat = incidents[i].lat;
  L.marker([lat,lng],11).addTo(map)
    .bindPopup(type)
    .openPopup();
}