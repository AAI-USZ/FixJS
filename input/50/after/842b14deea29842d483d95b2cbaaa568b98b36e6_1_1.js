function() {
     console.log($('#opponent-name').val()) 
    socket.emit('postChallenge', { 
      opponentName: $('#opponent-name').val()
    });
  }