function(){
              var h = new ServiceHandler(user);
              userToService[user] = h;
              app.log(app.Constants.Tag.MULTIPLAYER, [app.getUsers()[user].name,"joined",channelName]);
              onJoin(h);
            }