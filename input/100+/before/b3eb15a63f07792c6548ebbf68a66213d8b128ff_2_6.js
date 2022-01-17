function(_super) {

  __extends(InternalContext, _super);

  InternalContext.name = 'InternalContext';

  function InternalContext(parent, options) {
    this.parent = parent;
    this.options = options;
    this.cookies = this.parent.cookies;
  }

  InternalContext.prototype.begin = function() {
    return soma.router.run(this.options.url, this);
  };

  InternalContext.prototype.send = function(statusCode, body) {
    if (typeof statusCode !== 'number') {
      body = statusCode;
      statusCode = 200;
    }
    if (statusCode !== 200) {
      return this.options.error(statusCode, body);
    }
    if (typeof body !== 'object') {
      throw new Error('Internal contexts can only send JSON.');
    }
    return this.options.success(body);
  };

  InternalContext.prototype.sendError = function(err, body) {
    if (err) {
      console.log(err.stack);
    }
    return this.send(500, body);
  };

  InternalContext.prototype.go = function(path) {
    return this.parent.go(path);
  };

  return InternalContext;

}