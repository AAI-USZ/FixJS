function(path, status) {
  path = path.indexOf('://') ?
    path :
    (this.req.encrypted ? 'https://' : 'http://') + this.req.headers.host + this.req.url;
  
  this.res.writeHead(status || 302, {
    'Location': path
  });
  this.res.end();
}