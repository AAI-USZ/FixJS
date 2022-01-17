function(e) {
        var coordinates, marker, markerID;
        markerID = parseInt($(e.currentTarget).attr('data-markerID'));
        marker = _this.getMarkerByID(markerID);
        if (marker != null) {
          coordinates = new google.maps.LatLng(marker.lat, marker.lng);
          return _this.map.panTo(coordinates);
        }
      }