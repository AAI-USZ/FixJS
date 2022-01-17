function() {
    socket.emit('postChallenge', {
      opponentName: $('#opponent-name').val();
    });
  }