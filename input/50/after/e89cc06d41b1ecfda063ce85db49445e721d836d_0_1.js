function(event) { 
   var marker = new google.maps.Marker({
    position: event.latLng
   });
   if(activeInfoWindow)
    activeInfoWindow.close();
   infoWindow.open(map, marker);
   activeInfoWindow = infoWindow;
  }