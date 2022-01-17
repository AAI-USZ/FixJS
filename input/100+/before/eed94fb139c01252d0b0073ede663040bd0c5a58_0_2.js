function(_super) {

    __extends(Channel, _super);

    function Channel(name, socket) {
      this.name = name;
      this.socket = socket;
      this.emit = __bind(this.emit, this);

      this.listeners = [];
      this.events = {};
      this.socket.send(JSON.stringify({
        channel: this.name,
        action: 'join'
      }));
    }

    Channel.prototype.emit = function() {
      var args, event;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.socket.send(JSON.stringify({
        channel: this.name,
        event: event,
        args: args
      }));
      return true;
    };

    return Channel;

  }