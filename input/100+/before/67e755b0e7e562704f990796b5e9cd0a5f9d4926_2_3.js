function(callback) {
  if (typeof callback !== "undefined") {
    callback.call(this, "startedPZP", this);
  }
  this.connectedApp();
}