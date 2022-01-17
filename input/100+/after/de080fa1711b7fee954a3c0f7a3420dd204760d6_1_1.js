function(user) {
              if (user == null) {
                user = new app.model.Dao.User(null, fbObject.name, fbObject.id, fbObject.email, null);
              }
              console.log(user);
              app.dao.user.save(user);
              app.getUsers()[user.id]=user;
              auth.handler.alive(user.id);
              if (!app.getUsers()[user.id]) {
                app.log(app.Constants.Tag.AUTH, [app.getUsers()[user.id].name, "logged in"]);
                app.events.trigger(new app.model.Events.Event(app.Constants.Events.Type.USER_LOGGED_IN, app.Constants.Events.Level.IMPORTANT, app.getUsers()[user.id].name+" logged in"));
              }
              callback(user);
            }