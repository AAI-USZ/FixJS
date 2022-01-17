function(channel, message){
  if(currentChannel === channel)
    process.stdout.write(message + '\r\n');
  else
    messages[channel].unshift(message.toString());
}