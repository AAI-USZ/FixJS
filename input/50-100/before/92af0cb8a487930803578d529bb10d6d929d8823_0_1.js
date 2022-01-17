function Walker(root) {
  if (!(this instanceof Walker)) return new Walker(root)
  EventEmitter.call(this)
  this._pending = 0
  this._filterDir = function() { return true }
  this.go(root)
}