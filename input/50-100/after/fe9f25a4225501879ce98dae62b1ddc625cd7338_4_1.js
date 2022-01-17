function(text, o) {
  var msg = {type: 'info', level: 3, timestamp: Date.now()};

  msg.warning = text;
  msg.details = o;

  this.write(msg);
}