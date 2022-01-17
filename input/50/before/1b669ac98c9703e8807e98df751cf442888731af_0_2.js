function(channel, event_name, message) {
    var channel = that.channels[channel];
    if (typeof channel == 'undefined') return;
    channel.dispatch(event_name, message);
  }