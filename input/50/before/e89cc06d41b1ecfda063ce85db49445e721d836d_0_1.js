function(event) { 
   var marker = new google.maps.Marker({
    position: event.latLng
   }); 
   infowindow.open(map, marker);
  }