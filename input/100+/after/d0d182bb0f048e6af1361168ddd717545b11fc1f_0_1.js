function(err, res) {
  var body = res
    , type = 'application/json';

  // if(typeof body == 'string') type = 'text/plain';
  
  // default response
  this.res.statusCode = this.res.statusCode || 200; 

  // TODO: better errors (html instead of plain text)
  if(err) {
    debug('%j', err);
    if(this.res.statusCode < 400) this.res.statusCode = 400;
    type = 'plain/text';

    if(err.statusCode) this.res.statusCode = err.statusCode;

    if(Object.prototype.toString.call(err) === '[object Error]') {
      debug("it's an error");
      this.res.statusCode = 500;
      body = {message: err.message};
      type = 'text/plain';
    } else if(typeof err === 'object') {
      debug("it's an object");
      type = 'application/json';
      body = err;
    } else {
      debug("it's a message");
      body = {message: err};
    }
  }
  if(typeof body == 'object') body = JSON.stringify(body);

  this.res.setHeader('Content-Type', type);
  this.res.end(body);
}