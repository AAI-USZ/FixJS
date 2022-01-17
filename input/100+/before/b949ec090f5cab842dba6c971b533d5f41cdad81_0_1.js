function (chunk) {
  message = chunk.toString().substr(0, chunk.toString().length-1);
  if(message.match(/^\/exit/)) {
    Object.keys(messages).forEach(function(channel){
      pub.publish(channel,nick + ' left the room');
    });
    process.stdout.write('Goodbye\r\n');
    process.stdin.pause();
    sub.unsubscribe();
    pub.end();
    sub.end();
  }
  else if(message.match(/^\/channel /)) {
    var param = message.split(' ');
    if( param[1] && param[1] !== '' ){
      channel = param[1];
      sub.subscribe(channel);
    }
  }
  else if(message.match(/^\/nick /)) {
    var param = message.split(' ');
    if( param[1] && param[1] !== '' ){
      Object.keys(messages).forEach(function(channel){
        pub.publish(channel,nick + ' is known as ' + param[1]);
      });
      nick = param[1];
    }
  }
  else if(message.match(/^\/list/)) {
    process.stdout.write('Channel\'s list\r\n');
    Object.keys(messages).forEach(function(channel){
      process.stdout.write(channel + ' : ' + messages[channel].length + ' remaining messages\r\n');
    });
  }
  else if(message !== '')
    pub.publish(currentChannel,nick + ': ' + message);
}