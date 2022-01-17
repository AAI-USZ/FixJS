function(data) {
      client.action(data.target, data.message);
      socket.emit('message', {
        to: data.target,
        from: client.nick,
        text: '\u0001ACTION ' + data.message}
      );
    }