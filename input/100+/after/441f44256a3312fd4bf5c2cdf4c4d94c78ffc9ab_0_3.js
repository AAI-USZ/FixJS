function(user, callback) {
          if (!game.started) {
            if (true) {
              game.start();
              channel.onGameStart();
              app.log(app.Constants.Tag.MULTIPLAYER,["Game started:", room.name]);
              callback(true);
            } else {
              app.dao.user.get(user, function(u) {
                app.log(app.Constants.Tag.MULTIPLAYER,["Oh please, you're not the gamemaster. Don't try to be something you aren't, "+u.name]);
              });
            }
          } else {
            callback(false);
          }
        }