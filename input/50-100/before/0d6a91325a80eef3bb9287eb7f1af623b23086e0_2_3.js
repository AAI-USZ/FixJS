function() {
  this.client.log.debug('Handle callback packet');
  var id = this.readUInt16BE(id);

  var cb = this.client.callbacks[id];
  if (!cb) {
    this.client.$emit('error', new Error('Cant find callback'));
    return;
  }

  var args = this.readArgs();
  if (!args) {
    return;
  }

  cb.apply(null, args);
}