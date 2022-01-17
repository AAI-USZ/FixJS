function(){
          //load the sapir's most recent objects into the existing corpus, datalist, session and user
          window.app.loadBackboneObjectsById(couchConnection , window.appView.authView.model.get("userPrivate").get("mostRecentIds"));
          window.appView.renderEditableUserViews();//TODO sapirs details are in the models, but they arent getting rendered
          window.appView.renderReadonlyUserViews();
          self.render();
        }