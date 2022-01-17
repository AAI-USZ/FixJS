function(type, message) {
  return util.format('[%s](haredis#%d) %s: %s', new Date().toTimeString().split(' ')[0], this.connection_id, type, message);
}