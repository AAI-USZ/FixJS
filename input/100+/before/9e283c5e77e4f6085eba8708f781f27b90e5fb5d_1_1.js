function(data) {
      client.say(data.target, data.message);
      socket.emit('message', {to:data.target, from: client.nick, text:data.message});
      if(current_user){
        if(logger_users[data.target] == current_user.username) {
          log_message(data.target, {user: client.nick, message: data.message});
        }
        if(data.target[0] !== '#'){
          var target;
          target = (client.nick == data.to) ? client.nick : data.target;
          logname = (client.nick < target) ? client.nick + target : target + client.nick;
          log_message(logname, {user: client.nick, message: data.message});
        }
      }
    }