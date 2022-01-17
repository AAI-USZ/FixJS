function(model, response) {
                        Utils.debug('Corpus save success');
                        window.appView.addSavedDoc(model.id);
                        try{
                          window.app.get("authentication").get("userPrivate").get("mostRecentIds").corpusid = model.id;
                          localStorage.setItem("mostRecentCouchConnection", JSON.stringify(model.get("couchConnection")));
                        }catch(e){
                          Utils.debug("Couldnt save the corpus id to the user's mostrecentids"+e);
                        }
                        hub.publish("savedToPouch","corpus"+model.id);
                        localStorage.setItem("saveStatus", "Saving in unload...saved corpus");
                        localStorage.setItem("mostRecentDashboard", JSON.stringify(window.app.get("authentication").get("userPrivate").get("mostRecentIds")));
                        localStorage.setItem("saveStatus", "Saving in unload...saved entire dashboard");

                      }