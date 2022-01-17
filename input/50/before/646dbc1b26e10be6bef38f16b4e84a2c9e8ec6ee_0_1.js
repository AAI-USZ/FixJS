function (options) {
  options = options || {};

  // useful when using connect's bodyParser
  this.stream = options.stream || false;

  director.Router.prototype.configure.call(this, options);
}