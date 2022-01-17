function() {
      
      // If there are no comments, give it a new one
      if (!this.get("comments")) {
        this.set("comments", new Comments());
      }
      
      if (!this.get("dateCreated")) {
        this.set("dateCreated", (new Date()).toDateString());
      }
      
      //if the corpusname changes, change the pouch as well so that this object goes with its corpus's local pouchdb
//      this.bind("change:corpusname", function() {
//        this.pouch = Backbone.sync
//        .pouch(Utils.androidApp() ? Utils.touchUrl
//            + this.get("corpusname") : Utils.pouchUrl
//            + this.get("corpusname"));
//      }, this);
//      
//      try {
//        if (this.get("corpusname") == undefined) {
//          this.set("corpusname", app.get("corpus").get("corpusname"));
//        }
//        this.pouch = Backbone.sync
//        .pouch(Utils.androidApp() ? Utils.touchUrl
//            + this.get("corpusname") : Utils.pouchUrl
//            + this.get("corpusname"));
//      } catch(e) {
//        Utils.debug("Corpusname was undefined on this corpus, the datalist will not have a valid corpusname until it is set.");
//      }
    }