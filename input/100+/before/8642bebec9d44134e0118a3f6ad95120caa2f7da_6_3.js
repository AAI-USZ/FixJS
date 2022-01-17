function handle(arg) {
    var type = typeof arg;
    switch (type) {
      case 'number':
        port = arg;
        break;
      case 'string':
        host = arg;
        break;
      case 'function':
        callback = arg;
        break;
      default:
        self.emit('error', new Error('bad argument to connect'));
        break;
    }
  }