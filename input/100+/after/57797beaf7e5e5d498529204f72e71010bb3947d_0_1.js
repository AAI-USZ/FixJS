function(){
  hell.p.urlapi='http://hell.ershkus.ru/api';
  L.Icon.Default.imagePath='img';

  hell.map = new L.Map('map');
  var mapnik = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: "Map data &copy; <a href='http://osm.org'>OpenStreetMap</a> contributors"});
  
  var krymsk = new L.LatLng(44.9289, 37.9870);
  hell.map.setView(krymsk, 13).addLayer(mapnik);
  hell.map.markergroup = new L.LayerGroup();
  hell.map.addLayer(hell.map.markergroup);
  hell.map.allmarkers = {};

  // цветные маркеры
  hell.map.mcolors = new Array(new MarkerIcon({markerColor:'icon'}),new MarkerIcon({markerColor:'red'}), new MarkerIcon({markerColor:'yellow'}), new MarkerIcon({markerColor:'green'}));

  updateMarkers(); //load markers from server

  if (location.href.search("map.php")>0)
    return;

  window.osmhell = new OSMHell();
  window.osmhell.loadCityes();
  
  hell.inittab();
  $(window).resize(onresize);
  onresize();
}