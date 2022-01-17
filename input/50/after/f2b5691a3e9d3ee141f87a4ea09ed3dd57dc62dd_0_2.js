function() {
      var u = '/api/v1/queries/';
      u += "?" + this._createUrlOptions();
      console.log("fetching " + u);
      return u;
    }