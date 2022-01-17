function() {
      this.bind('error', function(model, error) {
        Utils.debug("Error in App: " + error);
      });
      
      // If there's no authentication, create a new one
      if (!this.get("authentication")) {
        this.set("authentication", new Authentication());
      }
      
      window.onbeforeunload = this.saveAllStateBeforeUserLeaves;
      window.onunload = this.storeCurrentDashboardIdsToLocalStorage;
      localStorage.setItem("saveStatus", "Not Saved");

      
    }