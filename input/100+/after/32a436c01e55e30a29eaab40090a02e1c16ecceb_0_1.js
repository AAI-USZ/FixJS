function(){
        self.get("currentSession").save(null, {
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
      }