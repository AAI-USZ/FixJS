function() {
    var onSuccess = function(pos) {
      var coords = pos.coords;
      model.location = { latitude: coords.latitude, longitude: coords.longitude };
    };

    var onFailure = function(err) {
      view.showError("locationCaptureFailed", "#error",  "Please ensure you have Geo-location enabled");
    };
    
    var onHeadingSuccess = function(e) {
      if(!!e.webkitCompassHeading == true) {
        var heading = e.webkitCompassHeading;
        model.heading = heading;
      }
    };
    
    navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
    model.heading = 0;
    window.ondeviceorientation = onHeadingSuccess;
  }