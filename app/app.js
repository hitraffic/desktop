var map = L.map('map').setView([21.4678, -157.9807], 11);
    mapLink = 
      '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; ' + mapLink,
      maxZoom: 18,
      }).addTo(map);


L.marker([21.4678, -157.9807], 11).addTo(map)
    .bindPopup('Some crazy shit happened here, avoid this area at all costs.')
    .openPopup();