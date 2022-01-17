function() {
      this.bind('error', function(model, error) {
        Utils.debug("Error in App: " + error);
      });
      
    }