function Request(method, url) {
  var self = this;
  if ('string' != url) url = format(url);
  this.method = method;
  this.url = url;
  this.header = {};
  this.writable = true;
  this._redirects = 0;
  this.redirects(5);
  this._buffer = true;
  this.attachments = [];
  this.on('response', function(res){
    self.callback(res);
  });
}