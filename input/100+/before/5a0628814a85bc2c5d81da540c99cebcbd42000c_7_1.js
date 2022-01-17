function(model, response) {
              if (neverBeenSaved) {
                // Add it to the default data list
                var defaultIndex = app.get("corpus").get("dataLists").length - 1;
                app.get("corpus").get("dataLists").models[defaultIndex].get("datumIds").unshift(model.id);
                
                // Save the default data list
                app.get("corpus").get("dataLists").models[defaultIndex].changeCorpus(app.get("corpus").get("corpusname"), function() {
                  app.get("corpus").get("dataLists").models[defaultIndex].save();
                });
                
                // Save the corpus
                app.get("corpus").changeCorpus(app.get("corpus").get("couchConnection"), function() {
                  app.get("corpus").save();
                });
                
                // If the default data list is the currently visible data list, add this datum to the view
                if (app.get("corpus").get("dataLists").models[defaultIndex].cid == app.get("corpus").get("dataLists").models[defaultIndex].cid) {
                  appView.dataListEditLeftSideView.addOne(model.id, true);
                }
              }
            }