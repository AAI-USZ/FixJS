function proxy(preq, pres) {
  pres.setHeader('Pragma', '0');
  pres.setHeader('Cache-Control', 'no-cache');
  pres.setHeader('Expires', '0');

  var method = preq.method;

  var ret = Url.parse(preq.url,true);
  delete preq.headers.host;
  delete preq.headers['x-requested-with'];


  var url;
  if ( !! ret.query.url) {
    url = ret.query.url;
  } else {
    pres.statusCode = 500;
    pres.end('url param no found!', 'utf8');
    return;
  }

  if (method == 'POST') {
    var postData = '';
    preq.on('data', function(chunk) {
      postData += chunk;
    });
    preq.on('end', function() {
      req.write(postData);
      req.end();
    });

  }

  ret = Url.parse(url);

  var headers = preq.headers;
  delete headers.host;
  delete headers['x-requested-with'];

  var options = {
    host: ret.host,
    port: ret.port,
    path: ret.path,
    method: method,
    headers: headers
  };

  var req = http.request(options, function(res) {
    
    for (var item in res.headers) {
      if (res.headers.hasOwnProperty(item)) {
        pres.setHeader(item, res.headers[item]);
      }
    }

    res.on('data', function(chunk) {
      pres.write(chunk);
    });
    res.on('end', function() {
      pres.end();
    });
  });

  req.on('error', function(e) {
    pres.statusCode = 500;
    pres.end('request error!', 'utf8');
  });
  if (method != 'POST') {
    req.end();
  }
}