function(user) { 
    socket.emit('profile', user);
  }