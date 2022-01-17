function() {
      if (this.needsSave) {
        // Change the needsSave flag before saving just in case another change
        // happens
        // before the saving is done
        this.needsSave = false;

        // Store the current Session, the current corpus, and the current date
        // in the Datum
        this.model.set({
          "session" : app.get("currentSession"),
          "corpusname" : app.get("corpus").get("corpusname"),
          "dateModified" : JSON.stringify(new Date())
        });

        // If this Datum has never been saved
        var neverBeenSaved = false;
        if (!this.model.get("dateEntered")) {
          neverBeenSaved = true;
          
          // Give a dateEntered
          this.model.set("dateEntered", JSON.stringify(new Date()));
        }

        Utils.debug("Saving the Datum");
        var self = this;
        this.model.changeCorpus(app.get("corpus").get("corpusname"), function(){
          self.model.save(null, {
            success : function(model, response) {
              window.appView.addSavedDoc(this.model.id);
              if (neverBeenSaved) {
                // Add it to the default data list
                var defaultIndex = app.get("corpus").get("dataLists").length - 1;
                app.get("corpus").get("dataLists").models[defaultIndex].get("datumIds").unshift(model.id);
                
                // Save the default data list
                app.get("corpus").get("dataLists").models[defaultIndex].changeCorpus(app.get("corpus").get("corpusname"), function() {
                  app.get("corpus").get("dataLists").models[defaultIndex].save();
                });
                
                // Save the corpus
                app.get("corpus").changeCorpus(app.get("corpus").get("couchConnection"), function() {
                  app.get("corpus").save();
                });
                
                // If the default data list is the currently visible data list, add this datum to the view
                if (app.get("corpus").get("dataLists").models[defaultIndex].cid == app.get("corpus").get("dataLists").models[defaultIndex].cid) {
                  appView.dataListEditLeftSideView.addOne(model.id, true);
                }
              }
            }
          });
        });
      }
    }