function(location) {
      // update the model
      if(location.status === "OK") {
        var geometry = location.results[0].geometry.location;
        model.target = { "latitude": geometry.$a, "longitude": geometry.ab} ;
      }
      else {
        // there was an error geocoding.
      }
    }