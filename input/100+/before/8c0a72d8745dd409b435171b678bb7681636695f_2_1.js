function(model, response) {
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
                    
                  }