function() {'use strict';
  
  // Connect to socket.io
  var socket = io.connect(window.Array.host);

  $('#waiting').click(function() {
    socket.emit('joinWaitingPool');
  });

  $('#challenge').click(function() {
    socket.emit('postChallenge', {
      opponentName: $('#opponent-name').val();
    });
  });

  socket.on('error', function() {
    console.log('got an error');
  });

  socket.on('battle', function() {
    window.location = '/battle';
  });
}