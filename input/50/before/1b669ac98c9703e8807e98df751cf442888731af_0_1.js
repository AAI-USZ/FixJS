function(channel_name) {
    var channel = new WebSocketRails.Channel(channel_name,this);
    channels[channel_name] = channel;
    return channel;
  }