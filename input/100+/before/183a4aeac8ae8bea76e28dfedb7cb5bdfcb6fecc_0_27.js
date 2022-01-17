function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
		  Mojo.Log.info("** ADRESA *** %j", results[1].formatted_address);
		  //force the result to have original coordinates
		  results[1].geometry.location = latlng;
		  this.PlaceDroppedPin(results[1]);
          return results[1];
        } else {
          
        }
      } else {
        Mojo.Log.info("Geocoder failed due to: " + status);
      }
    }