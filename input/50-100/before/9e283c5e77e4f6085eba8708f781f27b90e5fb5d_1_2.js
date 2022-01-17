function(name) {
      client.part(name);
      if(current_user){
        if(logger_users[name] == current_user.username){
          delete logger_users[name];
          for(client_key in clients){
            if(client_key == current_user.username){
              continue;
            }
            var cl = clients[client_key];
            // This does not work cl.chans is an object
            // need to do logic for channel
            if(cl.chans[name.toLowerCase()] !== undefined){
              logger_users[name.toLowerCase()] = cl.nick;
            }
          }
        }
      }
    }