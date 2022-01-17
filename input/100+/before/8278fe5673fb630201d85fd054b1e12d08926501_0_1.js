function(options, cb){
  if (typeof options === 'function') {
    cb      = options;
    options = {};
  }

  var charsetNumber = (options.charset)
    ? Config.getCharsetNumber(options.charset)
    : this.config.charsetNumber;

  return this._protocol.changeUser({
    user          : options.user || this.config.user,
    password      : options.password || this.config.password,
    database      : options.database || this.config.database,
    charsetNumber : charsetNumber,
    currentConfig : this.config,
  }, cb);
}