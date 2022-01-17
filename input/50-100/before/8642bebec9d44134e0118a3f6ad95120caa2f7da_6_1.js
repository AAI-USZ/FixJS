function (event, callback) {
  if (typeof event === 'string') {
    event = event.split(this._delimiter);
  }
  
  this.once(['data'].concat(event), callback);
}