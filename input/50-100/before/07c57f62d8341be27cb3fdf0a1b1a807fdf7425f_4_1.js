function(username, channelName, channelServer, msg_object) {
  Channel.findOne({name: channelName.toLowerCase(), user: username}, function(err, channel) {
    if(!channel){
      var channel = new Channel({name: channelName.toLowerCase(), server: channelServer.toLowerCase(), user: username});
    }
    channel.messages.push(msg_object);
    channel.save();
  });
}