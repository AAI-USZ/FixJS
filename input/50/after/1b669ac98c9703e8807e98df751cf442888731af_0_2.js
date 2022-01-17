function(channel, event_name, message) {
    var channel = channels[channel];
    if (typeof channel == 'undefined') return;
    channel.dispatch(event_name, message);
  }