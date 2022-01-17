function() {
      var geo = qx.bom.GeoLocation.getInstance();
      var self = this;
      geo.addListener("position", this._onGeolocationSuccess,this) 
      geo.addListener("error", this._onGeolocationError,this);
    }