function(model, response) {
                    Utils.debug('Session save success in import');
                    $(".import-progress").val($(".import-progress").val()+1);
                    window.app.get("corpus").get("sessions").unshift(model);
                    if(window.app.get("authentication").get("userPrivate").get("sessionHistory").indexOf(model.id) == -1){
                      window.app.get("authentication").get("userPrivate").get("sessionHistory").unshift(model.id);
                    }
                    window.app.get("authentication").get("userPrivate").get("activities").unshift(
                        new Activity({
                          verb : "added",
                          directobject : "session "+model.get("sessionFields").where({label: "goal"})[0].get("value"),
                          indirectobject : "in "+window.app.get("corpus").get("title"),
                          context : "via Offline App",
                          user: window.app.get("authentication").get("userPublic")
                        }));
                    window.location.replace("#"); //go back to dashboard after all suceeds
                  }