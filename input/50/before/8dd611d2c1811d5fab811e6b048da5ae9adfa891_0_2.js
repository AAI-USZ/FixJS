function(data) {
  if(!this.writable) {

  }
log(data);
  this.io.emit('msg push', data);
  return true;
}