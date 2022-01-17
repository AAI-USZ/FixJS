function() {
      var accessible;
      try{
        this.getContentDocument().body.URL;
        accessible = true;
      } catch( ex ) {
        accessible = false;
      }
      return accessible && this._isLoaded;
    }