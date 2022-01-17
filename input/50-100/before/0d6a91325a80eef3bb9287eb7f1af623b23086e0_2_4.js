function() {
  this.client.log.debug('Handle callback gc packet')
  var id = this.readUInt16BE(id)

  var cb = this.client.callbacks[id]
  if (!cb) {
    this.client.$emit('error', new Error('Cant find callback'))
    return;
  }

  delete this.client.callbacks[id]
}