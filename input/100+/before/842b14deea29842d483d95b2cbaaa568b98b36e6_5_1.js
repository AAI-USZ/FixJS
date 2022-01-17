function(socket) {
  var userID = socket.handshake.session.userID; 
  
  // Retrieve the user information and give it to the client.
  Users.get(userID, this.e(function(user) { 
    socket.emit('profile', user);
  }));
}