function() {
      // Initialially, the first datumState is selected
      if (this.get("datumStates") && (this.get("datumStates").models.length > 0)) {
        this.get("datumStates").models[0].set("selected", "selected");
      }
    }