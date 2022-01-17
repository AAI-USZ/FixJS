function(userToken) {
        app.events.trigger(new app.model.Events.Event(app.Constants.Events.Type.USER_LOGGED_OUT, app.Constants.Events.Level.IMPORTANT, app.getUsers()[userToken].name+" logged out"));
        delete app.getUserToRoom()[userToken]; 
        delete app.getUsers()[userToken];
      }