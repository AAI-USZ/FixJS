function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  err.transport = this.name;
  this.emit('error', err);
  return this;
}