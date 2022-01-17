function processMessage(socket) {
  var message = $('#send-message').val();

  if (message[0] == '/') {
    console.log('command');
    processCommand(socket, message);
  } else {
    sendMessage(socket);
  }   
  $('#send-message').val('');
}