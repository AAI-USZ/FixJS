function() {
      
    //if the corpusname changes, change the pouch as well so that this object goes with its corpus's local pouchdb
      this.bind("change:corpusname", function() {
        this.pouch = Backbone.sync
        .pouch(Utils.androidApp() ? Utils.touchUrl
            + this.get("corpusname") : Utils.pouchUrl
            + this.get("corpusname"));
      }, this);
      
      try{
        if(this.get("corpusname") == undefined){
          this.set("corpusname", app.get("corpus").couchConnection.corpusname);
        }
      }catch(e){
        Utils.debug("Corpusname was undefined on this corpus, the datum will not have a valid corpusname until it is set.");
      }
      
    }