function(err, csrf) {
    if (err) return cb(err);

    // parse the server URL (cfg.browserid)
    var uObj;
    var meth;
    var body;
    try {
      uObj = url.parse(cfg.browserid);
      meth = uObj.protocol === 'http:' ? http : https;
    } catch(e) {
      cb("can't parse url: " + e);
      return;
    }
    var headers = {
      'Content-Type': 'application/json'
    };
    injectCookies(context, headers);

    if (typeof postArgs === 'object') {
      postArgs['csrf'] = csrf;
      body = JSON.stringify(postArgs);
      headers['Content-Length'] = Buffer.byteLength(body);
    }

    var req = meth.request({
      host: uObj.hostname,
      port: uObj.port,
      path: path,
      headers: headers,
      method: "POST",
      agent: false // disable node.js connection pooling
    }, function(res) {
      extractCookies(context, res);
      var body = '';
      res.on('data', function(chunk) { body += chunk; })
      .on('end', function() {
        cb(null, {code: res.statusCode, headers: res.headers, body: body});
      });
    }).on('error', function (e) {
      cb(e);
    });

    req.write(body);
    req.end();
  }