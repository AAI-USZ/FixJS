function(lat, lng) {
      var latLng = new google.maps.LatLng(lat, lng);
      this.panorama.setPosition(latLng);
    }