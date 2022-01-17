function() {
      if (this.needsSave) {
        // Change the needsSave flag before saving just in case another change
        // happens
        // before the saving is done
        this.needsSave = false;
        
        // Store the current Session in the Datum
        this.model.set({
          "session" : app.get("currentSession"),
          "corpusname" : app.get("corpus").get("corpusname")
        });

        // If this Datum has never been saved
        if (!this.model.get("dateEntered")) {
          this.model.set("dateEntered", JSON.stringify(new Date()));
        }

        Utils.debug("Saving the Datum");
        var self = this;
        this.model.changeCorpus(app.get("corpus").get("corpusname"), function(){
          self.model.save();
        });
      }
    }