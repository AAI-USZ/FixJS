function(type, message) {
  return util.format('[%s](#%d) %s: %s', new Date().toTimeString().split(' ')[0], this.connection_id, type, message);
}