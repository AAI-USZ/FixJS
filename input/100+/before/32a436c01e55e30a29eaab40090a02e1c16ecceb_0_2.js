function(callback){
      this.get("currentSession").save(null, {
        success : function(model, response) {
          console.log('Session save success');
          try{
            window.app.get("authentication").get("userPrivate").get("mostRecentIds").sessionid = model.get("id");
          }catch(e){
            Utils.debug("Couldnt save the session id to the user's mostrecentids"+e);
          }
        },
        error : function(e) {
          console.log('Session save error' + e);
        }
      });
      this.get("currentDataList").save(null, {
        success : function(model, response) {
          console.log('Datalist save success');
          try{
            window.app.get("authentication").get("userPrivate").get("mostRecentIds").datalistid = model.get("id");
          }catch(e){
            Utils.debug("Couldnt save the datatlist id to the user's mostrecentids"+e);
          }
        },
        error : function(e) {
          console.log('Datalist save error' + e);
        }
      });
      this.get("corpus").save(null, {
        success : function(model, response) {
          console.log('Corpus save success');
          try{
            localStorage.setItem("mostRecentCouchConnection", model.get("couchConnection"));
            window.app.get("authentication").get("userPrivate").get("mostRecentIds").corpusid = model.get("id");
          }catch(e){
            Utils.debug("Couldnt save the corpus id to the user's mostrecentids"+e);
          }
        },
        error : function(e) {
          console.log('Corpus save error' + e);
        }
      });

        //Note: unable to use the success and fail of the backbone save to trigger this, so instead, waiting 1 second and hoping all the saves resulted in ids
        window.setTimeout( (function(callback){
          //moved the save of these into the 
//          var ids = {};
//          ids.corpusid = window.app.get("corpus").get("id");
//          ids.sessionid = window.app.get("currentSession").get("id");
//          ids.datalistid = window.app.get("currentDataList").get("id");
          
//          localStorage.setItem("appids", JSON.stringify(ids));
          localStorage.setItem("userid", window.app.get("authentication").get("userPrivate").get("id"));//the user private should get their id from mongodb
          
          //save ids to the user also so that the app can bring them back to where they were
          
          if(typeof callback == "function"){
            callback();
          }
        })(callback), 5000);
        
        
    }