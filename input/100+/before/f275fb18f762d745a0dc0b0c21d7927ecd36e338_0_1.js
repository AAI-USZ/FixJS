function(data) {
    for(i = 0; i < data.length; i++) {
      socket_message = data[i];
      var is_channel = false;

      if (data.length > 2) {
        var channel_name = socket_message[0],
            event_name   = socket_message[1],
            message      = socket_message[2];
        is_channel = true;
      } else {
        var event_name = socket_message[0],
            message    = socket_message[1];
      }
      if (that.state === 'connecting' && event_name === 'client_connected') {
        on_open(message);
      }
      if (is_channel == true) {
        that.dispatch_channel(channel_name, event_name, message);
      } else {
        that.dispatch(event_name, message);
      }
    }
  }