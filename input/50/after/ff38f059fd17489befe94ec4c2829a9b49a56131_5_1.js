function() {
      var accessible;
      try {
        var ignored = this.getContentDocument().body.URL;
        accessible = true;
      } catch( ex ) {
        accessible = false;
      }
      return accessible && this._isLoaded;
    }