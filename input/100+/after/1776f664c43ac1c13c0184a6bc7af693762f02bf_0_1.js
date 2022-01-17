function sendMessage(){
  var message = $('#message').val();
  var unfamiliar_tags = getUnfamiliarTagsInMessage(message);
  var proceed = true;
  if ( unfamiliar_tags ) {
    var taglist = unfamiliar_tags.join(', ')
    proceed = false;
    if(confirm("タグ「"+ taglist +"」は購読されていません。\n本当にメッセージを送信しますか？")){
      proceed = true;
    }
  }
  if ( proceed ) {
    message = message.replace(/(?:^| |　)#[a-zA-Z0-9]+/mg, '');
    message = message.replace(/\s/g, '');
    if(message.length>0){
      socket.emit('user message', $('#message').val());
      clear();
    }
  }
  return false;
}