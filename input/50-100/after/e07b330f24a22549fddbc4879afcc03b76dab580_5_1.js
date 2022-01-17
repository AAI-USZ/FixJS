function(data) {
      connection.client.say(data.target, data.message);
      socket.emit('message', {to:data.target.toLowerCase(), from: connection.client.nick, text:data.message});
      if(current_user){
        connection.logMessage(data.target, connection.client.nick, data.message);
      }
    }