function parseError(stream, message) {
    throw 'Parse Error: ' + message + ', got \''+stream+'\'';
  }