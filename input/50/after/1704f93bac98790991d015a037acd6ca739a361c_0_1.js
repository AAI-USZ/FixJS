function() {
      var geo = qx.bom.GeoLocation.getInstance();
      geo.addListener("position", this._onGeolocationSuccess,this) 
      geo.addListener("error", this._onGeolocationError,this);
    }