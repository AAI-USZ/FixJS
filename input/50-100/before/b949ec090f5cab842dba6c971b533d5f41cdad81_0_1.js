function(channel, message){
  console.log('message', channel, message.toString(), messages);
  if(currentChannel === channel)
    process.stdout.write(message + '\r\n');
  else
    messages[channel].unshift(message.toString());
}