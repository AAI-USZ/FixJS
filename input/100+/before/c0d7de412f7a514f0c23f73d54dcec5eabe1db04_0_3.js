function Socket (opts) {
  if ('string' == typeof opts) {
    var uri = util.parseUri(opts);
    opts = arguments[1] || {};
    opts.host = uri.host;
    opts.secure = uri.scheme == 'https' || uri.scheme == 'wss';
    opts.port = uri.port || (opts.secure ? 443 : 80);
  }

  opts = opts || {};
  this.secure = opts.secure || false;
  this.host = opts.host || opts.hostname || 'localhost';
  this.port = opts.port || 80;
  this.query = opts.query || {};
  this.query.uid = rnd();
  this.upgrade = false !== opts.upgrade;
  this.resource = opts.resource || 'default';
  this.path = (opts.path || '/engine.io').replace(/\/$/, '');
  this.path += '/' + this.resource + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.flashPath = opts.flashPath || '';
  this.transports = opts.transports || ['polling', 'websocket', 'flashsocket'];
  this.readyState = '';
  this.writeBuffer = [];
  this.open();
}