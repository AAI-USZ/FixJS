function(data) {
  if(!this.writable) {

  }
log(data);
  this.io.sockets.emit('msg push', data);
  return true;
}