function(){
      var self = this;
      this.createNewSession( function(){
        //after we have a session
        for(d in self.model.get("datumArray")){
          var thatdatum = self.model.get("datumArray")[d];
          thatdatum.set({
            "session" : self.model.get("session"),
            "corpusname" : self.model.get("corpusname")
          });

          thatdatum.set("dateEntered", JSON.stringify(new Date()));
          thatdatum.set("dateModified", JSON.stringify(new Date()));

          Utils.debug("Saving the Datum");
          thatdatum.changeCorpus(app.get("corpus").get("corpusname"), function(){
            thatdatum.save(null, {
              success : function(model, response) {
                Utils.debug('Datum save success in import');
                self.model.dataListView.addOne(model.id);
                
                // Add it to the default data list
                var defaultIndex = app.get("corpus").get("dataLists").length - 1;
                app.get("corpus").get("dataLists").models[defaultIndex].get("datumIds").unshift(model.id);
                
                // If the default data list is the currently visible data list, re-render it
                if (app.get("corpus").get("dataLists").models[defaultIndex].cid == app.get("corpus").get("dataLists").models[defaultIndex].cid) {
                  appView.dataListEditLeftSideView.addOne(model.id);
                }
              },
              error : function(e) {
                alert('Datum save failure in import' + e);
              }
            });
          });
        }
        
        // Save the default DataList
        Utils.debug("Saving the DataList");
        var defaultIndex = app.get("corpus").get("dataLists").length - 1;
        app.get("corpus").get("dataLists").models[defaultIndex].changeCorpus(self.model.get("corpusname"), function() {
          app.get("corpus").get("dataLists").models[defaultIndex].save();
          app.get("corpus").save();
        });
        
        // Save the new DataList
        self.model.get("dataList").changeCorpus(self.model.get("corpusname"), function(){
          self.model.get("dataList").save(null, {
            success : function(model, response) {
              Utils.debug('Data list save success in import');
              window.app.get("corpus").get("dataLists").unshift(self.model.get("dataList"));
              window.app.get("authentication").get("userPrivate").get("dataLists").push(self.model.get("dataList").id);
              self.model.dataListView.temporaryDataList = false;
              window.app.get("authentication").get("userPrivate").get("activities").unshift(
                  new Activity({
                    verb : "imported",
                    directobject : self.model.get("datumArray").length + " data entries",
                    indirectobject : "in "+window.app.get("corpus").get("title"),
                    context : "via Offline App",
                    user: window.app.get("authentication").get("userPublic")
                  }));
              window.app.get("authentication").get("userPrivate").get("activities").unshift(
                  new Activity({
                    verb : "added",
                    directobject : "data list "+model.get("title"),
                    indirectobject : "in "+window.app.get("corpus").get("title"),
                    context : "via Offline App",
                    user: window.app.get("authentication").get("userPublic")
                  }));
              
              //Save the session too
              var sessself = self.model.get("session");
              this.model.get("session").changeCorpus(this.model.get("corpusname"), function(){
                sessself.model.get("session").save(null, {
                  success : function(model, response) {
                    Utils.debug('Session save success in import');
                    window.app.get("authentication").get("userPrivate").get("activities").unshift(
                        new Activity({
                          verb : "added",
                          directobject : "session "+model.get("sessionFields").where({label: "goal"})[0].get("value"),
                          indirectobject : "in "+window.app.get("corpus").get("title"),
                          context : "via Offline App",
                          user: window.app.get("authentication").get("userPublic")
                        }));
                    if(window.app.get("authentication").get("userPrivate").get("sessionHistory").indexOf(self.model.get("session").id) == -1){
                      window.app.get("authentication").get("userPrivate").get("sessionHistory").unshift(self.model.get("session").id);
                    }
                    window.app.get("corpus").get("sessions").unshift(self.model.get("session"));
                    
                  },
                  error : function(e) {
                    alert('Session save failure in import' + e);
                  }
                });
              });

            },
            error : function(e) {
              alert('Data list save failure in import' + e);
            }
          });
        });
      });
      window.location.replace("#"); //go back to dashboard
    }