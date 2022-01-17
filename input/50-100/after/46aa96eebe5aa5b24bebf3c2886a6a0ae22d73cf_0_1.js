function(err, res) {
  var body = res
    , type = 'application/json';

  // TODO better errors
  if(err) {
    if(this.res.statusCode < 400) this.res.statusCode = 400;
    type = 'plain/text';
    body = err.message;
  }
  if(typeof body == 'string') type = 'text/plain';
  if(typeof body == 'object') body = JSON.stringify(body);

  this.res.setHeader('Content-Type', type);
  this.res.end(body);
}