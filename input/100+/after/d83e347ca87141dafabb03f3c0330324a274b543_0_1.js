function(callback){
      localStorage.setItem("saveStatus", "Saving in unload...in store function");
      window.app.get("authentication").saveAndEncryptUserToLocalStorage();

      /*
       * Turn on pub sub to find out when all three have saved, then call the callback
       */
      var thiscallback = callback;
      
      this.savedcount = 0;
      this.savefailedcount = 0;
      window.hub.unsubscribe("savedToPouch", null, this);
      window.hub.unsubscribe("saveFailedToPouch", null, this);
      window.hub.subscribe("savedToPouch",function(arg){
        alert("Saved "+ arg+ " to pouch.");
        window.app.savedcount++;
        if( window.app.savedcount > 2){
//       dont need, now using all details   localStorage.setItem("userid", window.app.get("authentication").get("userPrivate").id);//the user private should get their id from mongodb
          window.app.get("authentication").staleAuthentication = true;//TODO turn this on when the pouch stops making duplicates for all the corpus session datalists that we call save on, this will also trigger a sync of the user details to the server, and ask them to use their password to confim that they want to replcate to their corpus.
          localStorage.setItem("mostRecentDashboard", JSON.stringify(window.app.get("authentication").get("userPrivate").get("mostRecentIds")));
          alert("Your dashboard has been saved, you can exit the page at anytime and return to this state.");
          //save ids to the user also so that the app can bring them back to where they were
          if(typeof thiscallback == "function"){
            thiscallback();
          }
//          maybe this was breaking the replicate corpus ?
          if(window.appView){
            window.appView.renderReadonlyDataListViews();
            window.appView.renderReadonlySessionViews();
            window.appView.renderReadonlyCorpusViews();
          }
          window.hub.unsubscribe("savedToPouch", null, window.app);
        }
      },this);
      window.hub.subscribe("saveFailedToPouch",function(arg){
        Utils.debug("Saved "+ arg+ " to pouch.");
        window.app.savefailedcount++;
        alert("Save failed "+arg);
      },this);
      var self = this;
      this.get("currentSession").changeCorpus( self.get("corpus").get("couchConnection").corpusname, function(){
        self.get("currentSession").save(null, {
          success : function(model, response) {
            Utils.debug('Session save success');
            window.appView.addSavedDoc(model.id);
            try{
              window.app.get("authentication").get("userPrivate").get("mostRecentIds").sessionid = model.id;
              window.app.get("authentication").get("userPrivate").get("activities").unshift(
                  new Activity({
                    verb : "saved",
                    directobject : "session "+ model.get("sessionFields").where({label: "goal"})[0].get("value"),
                    indirectobject : "in "+window.app.get("corpus").get("title"),
                    context : "via Offline App",
                    user: window.app.get("authentication").get("userPublic")
                  }));
            }catch(e){
              Utils.debug("Couldnt save the session id to the user's mostrecentids"+e);
            }
            hub.publish("savedToPouch","session"+model.id);
            localStorage.setItem("saveStatus", "Saving in unload...saved session");

            self.get("currentDataList").changeCorpus( self.get("corpus").get("couchConnection").corpusname, function(){
              self.get("currentDataList").save(null, {
                success : function(model, response) {
                  Utils.debug('Datalist save success');
                  window.appView.addSavedDoc(model.id);
                  try{
                    window.app.get("authentication").get("userPrivate").get("mostRecentIds").datalistid = model.id;
                    window.app.get("authentication").get("userPrivate").get("activities").unshift(
                        new Activity({
                          verb : "saved",
                          directobject : "datalist "+ model.get("title"),
                          indirectobject : "in "+window.app.get("corpus").get("title"),
                          context : "via Offline App",
                          user: window.app.get("authentication").get("userPublic")
                        }));
                  }catch(e){
                    Utils.debug("Couldnt save the datatlist id to the user's mostrecentids"+e);
                  }
                  hub.publish("savedToPouch","datalist"+model.id);
                  localStorage.setItem("saveStatus", "Saving in unload...saved datalist");

                  self.get("corpus").changeCorpus( self.get("corpus").get("couchConnection"), function(){
                    self.get("corpus").save(null, {
                      success : function(model, response) {
                        Utils.debug('Corpus save success');
                        window.appView.addSavedDoc(model.id);
                        try{
                          window.app.get("authentication").get("userPrivate").get("mostRecentIds").corpusid = model.id;
                          localStorage.setItem("mostRecentCouchConnection", JSON.stringify(model.get("couchConnection")));
                          window.app.get("authentication").get("userPrivate").get("activities").unshift(
                              new Activity({
                                verb : "saved",
                                directobject : "corpus "+ model.get("title"),
                                indirectobject : "",
                                context : "via Offline App",
                                user: window.app.get("authentication").get("userPublic")
                              }));
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
          },
          error : function(e) {
            Utils.debug('Session save error' );
            Utils.debug(e);
            hub.publish("saveFailedToPouch","session");
          }
        });
      });
      localStorage.setItem("saveStatus", "Saving in unload...end store function");

      return "Returning before the save is done.";
    }