function (event, listener) {
  this.off(['data'].concat(event), listener);
}