function() {
      var args, event;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.socket.send(JSON.stringify({
        channel: this.name,
        event: event,
        args: args
      }));
      return true;
    }