function(user) {
          if (!game.started) {
            if (true) {
              game.start();
              app.log(app.Constants.Tag.MULTIPLAYER,["Game started"]);
            } else {
              app.dao.user.get(user, function(u) {
                app.log(app.Constants.Tag.MULTIPLAYER,["Oh please, you're not the gamemaster. Don't try to be something you aren't, "+u.name]);
              });
            }
          }
        }