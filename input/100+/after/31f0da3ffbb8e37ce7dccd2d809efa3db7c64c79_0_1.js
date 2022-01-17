function(url){
  var app = this.app
    , req = this.req
    , head = 'HEAD' == req.method
    , status = 302
    , body;

  // allow status / url
  if (2 == arguments.length) {
    status = url;
    url = arguments[1];
  }

  // setup redirect map
  var map = { back: req.get('Referrer') || '/' };

  // perform redirect
  url = map[url] || url;

  // relative
  if (!~url.indexOf('://')) {
    var path = ''; //app.path();

    // relative to path
    if (0 == url.indexOf('./') || 0 == url.indexOf('..')) {
      url = req.path + '/' + url;
    // relative to mount-point
    } else if ('/' != url[0]) {
      url = path + '/' + url;
    }

    // Absolute
    var host = req.get('Host');
    url = req.protocol + '://' + host + url;
  }

  // Support text/{plain,html} by default
  this.format({
    text: function(){
      body = statusCodes[status] + '. Redirecting to ' + url;
    },

    html: function(){
      body = '<p>' + statusCodes[status] + '. Redirecting to <a href="' + url + '">' + url + '</a></p>';
    }
  })

  // Respond
  this.statusCode = status;
  this.set('Location', url);
  this.end(head ? null : body);
}