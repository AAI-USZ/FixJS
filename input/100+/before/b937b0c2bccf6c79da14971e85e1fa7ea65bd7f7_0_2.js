function(model, response) {
                        Utils.debug('Corpus save success');
                        hub.publish("savedToPouch","corpus"+model.id);
                        try{
                          localStorage.setItem("mostRecentCouchConnection", JSON.stringify(model.get("couchConnection")));
                          window.app.get("authentication").get("userPrivate").get("mostRecentIds").corpusid = model.id;
                        }catch(e){
                          Utils.debug("Couldnt save the corpus id to the user's mostrecentids"+e);
                        }
                      }