function init () {
  this.ensureIndexes()
  this.schema.emit('init', this);
}