function(pos) {
      if (pos != null) {
        return new google.maps.LatLng(pos[0], pos[1]);
      } else {
        return null;
      }
    }