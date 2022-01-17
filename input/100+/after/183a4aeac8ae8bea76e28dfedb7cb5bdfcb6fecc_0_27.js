function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
		  Mojo.Log.info("** ADRESA *** %j", results[0].formatted_address);
		  //force the result to have original coordinates
		  results[0].geometry.location = latlng;
		  //generate random number as ID for dropped markers
		  results[0].id = Math.floor((Math.random()*1000000000000)+1);
		  this.PlaceDroppedPin(results[0]);
          return results[0];
        } else {
          
        }
      } else {
        Mojo.Log.info("Geocoder failed due to: " + status);
      }
    }