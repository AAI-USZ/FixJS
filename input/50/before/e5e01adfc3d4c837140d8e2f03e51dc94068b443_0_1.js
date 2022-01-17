function () {
  var args = util.args(arguments);
  return this.emit.apply(this, ['err'].concat(args));
}