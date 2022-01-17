function(data) {
    console.log('command received', data);
    clients[data.key].emit('command', data);
  }