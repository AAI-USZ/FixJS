function(callback){
      /*
       * Turn on pub sub to find out when all three have saved, then call the callback
       */
      var thiscallback = callback;
      window.hub.unsubscribe("savedToPouch", null, this);
      window.hub.unsubscribe("saveFailedToPouch", null, this);
      
      this.savedcount = 0;
      this.savefailedcount = 0;
      window.hub.subscribe("savedToPouch",function(arg){
        alert("Saved "+ arg+ " to pouch.");
        window.app.savedcount++;
        if( window.app.savedcount.length == 3){
          localStorage.setItem("userid", window.app.get("authentication").get("userPrivate").get("id"));//the user private should get their id from mongodb
          //save ids to the user also so that the app can bring them back to where they were
          if(typeof thiscallback == "function"){
            thiscallback();
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
            hub.publish("savedToPouch","session"+model.get("id"));
            try{
              window.app.get("authentication").get("userPrivate").get("mostRecentIds").sessionid = model.get("id");
            }catch(e){
              Utils.debug("Couldnt save the session id to the user's mostrecentids"+e);
            }
          },
          error : function(e) {
            Utils.debug('Session save error' + e);
            hub.publish("saveFailedToPouch","session");
          }
        });
      });
      this.get("currentDataList").changeCorpus( self.get("corpus").get("couchConnection").corpusname, function(){
        self.get("currentDataList").save(null, {
          success : function(model, response) {
            Utils.debug('Datalist save success');
            hub.publish("savedToPouch","datalist"+model.get("id"));
            try{
              window.app.get("authentication").get("userPrivate").get("mostRecentIds").datalistid = model.get("id");
            }catch(e){
              Utils.debug("Couldnt save the datatlist id to the user's mostrecentids"+e);
            }
          },
          error : function(e) {
            Utils.debug('Datalist save error' + e);
            hub.publish("saveFailedToPouch","datalist");
          }
        });
      });
      this.get("corpus").changeCorpus( self.get("corpus").get("couchConnection"), function(){
        self.get("corpus").save(null, {
          success : function(model, response) {
            Utils.debug('Corpus save success');
            hub.publish("savedToPouch","corpus"+model.get("id"));
            try{
              localStorage.setItem("mostRecentCouchConnection", JSON.stringify(model.get("couchConnection")));
              window.app.get("authentication").get("userPrivate").get("mostRecentIds").corpusid = model.get("id");
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