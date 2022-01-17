function(model, response) {
            Utils.debug('Session save success');
            try{
              window.app.get("authentication").get("userPrivate").get("mostRecentIds").sessionid = model.id;
            }catch(e){
              Utils.debug("Couldnt save the session id to the user's mostrecentids"+e);
            }
            hub.publish("savedToPouch","session"+model.id);
            localStorage.setItem("saveStatus", "Saving in unload...saved session");

            self.get("currentDataList").changeCorpus( self.get("corpus").get("couchConnection").corpusname, function(){
              self.get("currentDataList").save(null, {
                success : function(model, response) {
                  Utils.debug('Datalist save success');
                  try{
                    window.app.get("authentication").get("userPrivate").get("mostRecentIds").datalistid = model.id;
                  }catch(e){
                    Utils.debug("Couldnt save the datatlist id to the user's mostrecentids"+e);
                  }
                  hub.publish("savedToPouch","datalist"+model.id);
                  localStorage.setItem("saveStatus", "Saving in unload...saved datalist");

                  self.get("corpus").changeCorpus( self.get("corpus").get("couchConnection"), function(){
                    self.get("corpus").save(null, {
                      success : function(model, response) {
                        Utils.debug('Corpus save success');
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

                      },
                      error : function(e) {
                        Utils.debug('Corpus save error' );
                        Utils.debug(e);
                        hub.publish("saveFailedToPouch","corpus");
                      }
                    });
                  });
                },
                error : function(e) {
                  Utils.debug('Datalist save error');
                  Utils.debug(e);
                  hub.publish("saveFailedToPouch","datalist");
                }
              });
            });
          }