function(err, res) {
  var body = res
    , type = 'application/json';

  // TODO better errors
  if(err) {
    this.res.statusCode = 400;
    body = JSON.stringify(err);
  }
  if(typeof body == 'string') type = 'text/plain';
  if(typeof body == 'object') body = JSON.stringify(body);

  this.res.setHeader('Content-Type', type);
  this.res.end(body);
}