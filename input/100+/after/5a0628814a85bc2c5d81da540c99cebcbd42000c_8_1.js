function(model, response) {
            Utils.debug('Session save success');
            try{
              if(window.app.get("currentSession").id != model.id){
                window.app.get("corpus").get("sessions").unshift(model);
                window.appView.activityFeedView.model.get("activities").add(
                    new Activity({
                      verb : "added",
                      directobject : "a session",
                      indirectobject : "in "+window.app.get("corpus").get("title"),
                      context : "via Offline App",
                      user: window.app.get("authentication").get("userPublic")
                    }));
              }
              window.app.set("currentSession", model);
              window.appView.renderEditableSessionViews();
              window.appView.renderReadonlySessionViews();
              window.appView.addSavedDoc(model.id);
              window.app.get("authentication").get("userPrivate").get("mostRecentIds").sessionid = model.id;
              //add session to the users session history if they dont already have it
              if(window.app.get("authentication").get("userPrivate").get("sessionHistory").indexOf(model.id) == -1){
                window.app.get("authentication").get("userPrivate").get("sessionHistory").unshift(model.id);
              }
            }catch(e){
              Utils.debug("Couldnt save the session id to the user's mostrecentids"+e);
            }
          }