function(method, path, params, callback, addData) {
  addData = addData || false;
  if (!this.getApiKey() || !this.getHost()) {
    throw new Error("Error: apiKey and host must be configured.");
  }

  var options = {
    host: this.getHost(),
    path: method == 'GET' ? this.generatePath(path, params) : path,
    method: method,
    headers: {
      'X-Redmine-API-Key': this.getApiKey()
    }
  };

  var req = https.request(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));

    if (res.statusCode != 200 && res.statusCode != 201) {
      callback({message: 'Server returns stats code: ' + res.statusCode, response: res}, null);
      callback = null;
      return ;
    }

    var body = "";
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function(e) {
      var data = JSON.parse(body);
      callback(null, data, addData);
      callback = null;
    });
  });

  req.on('error', function(err) {
    callback(err, null);
    callback = null;
  });

  if (method != 'GET') {
    var body = JSONStringify(params);
    req.setHeader('Content-Length', body.length);
    req.setHeader('Content-Type', 'application/json');
    req.write(body);
  }
  req.end();
}