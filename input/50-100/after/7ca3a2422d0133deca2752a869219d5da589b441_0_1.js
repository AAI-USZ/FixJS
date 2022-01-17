function(path, status) {
  var url = '';
  
  if(~path.indexOf('://')) {
    url = path;
  } else {
    url += this.req.encrypted ? 'https://' : 'http://';
    url += this.req.headers.host;
    url += (path[0] === '/') ? path : '/' + path; 
  }
 
  this.res.writeHead(status || 302, {
    'Location': url
  });
  this.res.end();
}