function(buffer) {
  this.buffer += buffer.toString('utf8');
  return buffer.length;
}