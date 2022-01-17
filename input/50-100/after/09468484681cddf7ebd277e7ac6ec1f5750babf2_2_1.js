function(model, response) {
              if (neverBeenSaved) {
                // Add it to the default data list
                app.get("corpus").get("dataLists").models[0].get("datumIds").unshift(model.id);
                
                // If the default data list is the currently visible data list, re-render it
                if (app.get('corpus').get("dataLists").models[0].cid == app.get("corpus").get("dataLists").models[0].cid) {
                  appView.renderEditableDataListViews();
                  appView.renderReadonlyDataListViews();
                }
              }
            }