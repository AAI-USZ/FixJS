function processMessage(socket) {
  var message = $('#send-message').val();

  if (message[0] == '/') {
    processCommand(socket, message);
  } else {
    sendMessage(socket);
  }   
  $('#send-message').val('');
}