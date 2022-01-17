function(model, response) {
            Utils.debug('Session save success');
            hub.publish("savedToPouch","session"+model.get("id"));
            try{
              window.app.get("authentication").get("userPrivate").get("mostRecentIds").sessionid = model.get("id");
            }catch(e){
              Utils.debug("Couldnt save the session id to the user's mostrecentids"+e);
            }
          }