function(position) {
  last_loc=position;
  map.panTo(new google.maps.LatLng(position.latitude, position.longitude));
}