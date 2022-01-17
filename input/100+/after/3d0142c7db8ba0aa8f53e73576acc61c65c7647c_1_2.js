function(){
        self.model.save(null, {
          success : function(model, response) {
            Utils.debug('Session save success');
            try{
              window.app.get("authentication").get("userPrivate").get("mostRecentIds").sessionid = model.id;
              window.app.set("currentSession", self.model);
              window.appView.renderEditableSessionViews();
              window.appView.renderReadonlySessionViews();
            }catch(e){
              Utils.debug("Couldnt save the session id to the user's mostrecentids"+e);
            }
          },
          error : function(e) {
            Alert('Session save error' + e);
          }
        });
      }