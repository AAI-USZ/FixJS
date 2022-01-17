function(data) {
      client.action(data.target, data.message);
      socket.emit('message', {
        to: data.target.toLowerCase(),
        from: client.nick.toLowerCase(),
        text: '\u0001ACTION ' + data.message}
      );
    }