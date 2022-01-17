function Channel(name, socket) {
      this.name = name;
      this.socket = socket;
      this.removeAllListeners = __bind(this.removeAllListeners, this);

      this.removeListener = __bind(this.removeListener, this);

      this.once = __bind(this.once, this);

      this.addListener = __bind(this.addListener, this);

      this.emit = __bind(this.emit, this);

      this.realEmit = __bind(this.realEmit, this);

      this.listeners = [];
      this.events = {};
      this.socket.send(JSON.stringify({
        channel: this.name,
        action: 'join'
      }));
    }