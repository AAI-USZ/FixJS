function(model, response) {
            Utils.debug('Datalist save success');
            try{
              if(window.app.get("currentDataList").id != model.id){
                window.app.get("corpus").get("dataLists").unshift(model);
                window.appView.activityFeedView.model.get("activities").add(
                    new Activity({
                      verb : "added",
                      directobject : "a data list",
                      indirectobject : "in "+window.app.get("corpus").get("title"),
                      context : "via Offline App",
                      user: window.app.get("authentication").get("userPublic")
                    }));
              }
              window.app.set("currentDataList", model);
              window.appView.renderEditableDataListViews();
              window.appView.renderReadonlyDataListViews();
              window.appView.addSavedDoc(model.id);
              window.app.get("authentication").get("userPrivate").get("mostRecentIds").datalistid = model.id;
              //add datalist to the users datalist history if they dont already have it
              if(window.app.get("authentication").get("userPrivate").get("dataLists").indexOf(model.id) == -1){
                window.app.get("authentication").get("userPrivate").get("dataLists").unshift(model.id);
              }
            }catch(e){
              Utils.debug("Couldnt save the datalist id to the user's mostrecentids"+e);
            }
          }