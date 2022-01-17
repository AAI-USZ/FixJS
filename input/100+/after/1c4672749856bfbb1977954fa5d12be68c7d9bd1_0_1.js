function init(){
  map = new L.Map('map');
  var mapnik = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: "Map data &copy; <a href='http://osm.org'>OpenStreetMap</a> contributors"});
  
  var krymsk = new L.LatLng(44.915, 38.0);
  map.setView(krymsk, 13).addLayer(mapnik);
  
  window.osmhell = new OSMHell($('#city_select')[0], $('#street_select')[0], $('#building_select')[0]);
  window.osmhell.loadCityes();
}