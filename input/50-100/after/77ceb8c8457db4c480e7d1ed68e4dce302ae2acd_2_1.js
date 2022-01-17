function(name, args, callback) {
  if (arguments.length == 2) {
    callback = args;
    args = null;
  }
  var requestId = this.idSequence;
  this.idSequence++;

  return this._retry_call(requestId, name, args, callback);
}