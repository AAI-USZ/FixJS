function(e, text) {
  var msg = {type: 'exception', level: 5, timestamp: Date.now()};

  msg.description = text || '';
  msg.stack = e.stack;

  this.write(msg);
}