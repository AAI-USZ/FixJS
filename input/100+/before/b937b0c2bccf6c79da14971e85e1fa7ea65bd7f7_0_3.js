function(model, response) {
                  Utils.debug('Datalist save success');
                  hub.publish("savedToPouch","datalist"+model.id);
                  try{
                    window.app.get("authentication").get("userPrivate").get("mostRecentIds").datalistid = model.id;
                  }catch(e){
                    Utils.debug("Couldnt save the datatlist id to the user's mostrecentids"+e);
                  }
                  self.get("corpus").changeCorpus( self.get("corpus").get("couchConnection"), function(){
                    self.get("corpus").save(null, {
                      success : function(model, response) {
                        Utils.debug('Corpus save success');
                        hub.publish("savedToPouch","corpus"+model.id);
                        try{
                          localStorage.setItem("mostRecentCouchConnection", JSON.stringify(model.get("couchConnection")));
                          window.app.get("authentication").get("userPrivate").get("mostRecentIds").corpusid = model.id;
                        }catch(e){
                          Utils.debug("Couldnt save the corpus id to the user's mostrecentids"+e);
                        }
                      },
                      error : function(e) {
                        Utils.debug('Corpus save error' + e);
                        hub.publish("saveFailedToPouch","corpus");
                      }
                    });
                  });
                }