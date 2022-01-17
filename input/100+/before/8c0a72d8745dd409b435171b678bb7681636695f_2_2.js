function(model, response) {
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

            }