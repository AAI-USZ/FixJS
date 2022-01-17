function sendMessage(){
  var message = $('#message').val();
  message = message.replace(/(?:^| |　)#[a-zA-Z0-9]+/mg, '');
  message = message.replace(/\s/g, '');
  if(message.length>0){
    socket.emit('user message', $('#message').val());
    clear();
  }
  return false;
}