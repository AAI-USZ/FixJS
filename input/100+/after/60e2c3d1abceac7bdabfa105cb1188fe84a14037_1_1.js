function() {
      // Initially, the first datumState is selected
      if (this.get("datumStates") && (this.get("datumStates").models.length > 0)) {
        this.get("datumStates").models[0].set("selected", "selected");
      }
      
      // If there's no audioVideo, give it a new one.
      if (!this.get("audioVideo")) {
        this.set("audioVideo", new AudioVideo());
      }
      
      // If there are no comments, give it a new one
      if (!this.get("comments")) {
        this.set("comments", new Comments());
      }
      
      // If there are no datumTags, give it a new one
      if (!this.get("datumTags")) {
        this.set("datumTags", new DatumTags());
      }
    }