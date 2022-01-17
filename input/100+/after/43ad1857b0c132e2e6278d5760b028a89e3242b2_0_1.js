function(obj){
  // allow status / body
  if (2 == arguments.length) {
    // res.json(body, status) backwards compat
    if ('number' == typeof arguments[1]) {
      this.statusCode = arguments[1];
    } else {
      this.statusCode = obj;
      obj = arguments[1];
    }
  }

  // settings
  var app = this.app
    , jsonp = app.get('jsonp callback')
    , replacer = app.get('json replacer')
    , spaces = app.get('json spaces')
    , body = JSON.stringify(obj, replacer, spaces)
    , callbackname = app.get('jsonp callback name')
    , callback;
  

  // content-type
  this.charset = this.charset || 'utf-8';
  this.set('Content-Type', 'application/json');
  
  //jsonp callback name
  if (callbackname) {
	    callback = this.req.query[callbackname];
  } else {
	    callback = this.req.query.callback;
  }
  
  // jsonp
  if (callback && jsonp) {
    this.set('Content-Type', 'text/javascript');
    body = callback.replace(/[^[]\w$.]/g, '') + '(' + body + ');';
  }

  return this.send(body);
}