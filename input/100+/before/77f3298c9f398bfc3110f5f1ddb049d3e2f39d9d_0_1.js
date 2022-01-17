function parseRequest(method, path, data, callback) {
  var auth = 'Basic ' + new Buffer(this._application_id + ':' + this._master_key).toString('base64');
  var headers = {
    Authorization: auth,
    Connection: 'Keep-alive'
  };
  var body = null;

  switch (method) {
    case 'GET':
      if (data) {
        path += '?' + qs.stringify(data);
      }
      break;
    case 'POST':
    case 'PUT':
      body = JSON.stringify(data);
      headers['Content-type'] = 'application/json';
      headers['Content-length'] = body.length;
      break;
    case 'DELETE':
      headers['Content-length'] = 0;
      break;
    default:
      throw new Error('Unknown method, "' + method + '"');
  }

  var options = {
    host: this._api_host,
    port: this._api_port,
    headers: headers,
    path: path,
    method: method
  };

  var req = this._api_protocol.request(options, function (res) {
    if (!callback) {
      return;
    }

    if (res.statusCode < 200 || res.statusCode >= 300) {
      var err = new Error('HTTP error ' + res.statusCode);
      err.arguments = arguments;
      err.type = res.statusCode;
      err.options = options;
      err.body = body;
      return callback(err);
    }

    var json = '';
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      json += chunk;
    });

    res.on('end', function () {
      var err = null;
      var data = null;
      try {
        var data = JSON.parse(json);
      } catch (err) {
      }
      callback(err, data);
    });

    res.on('close', function (err) {
      callback(err);
    });
  });

  body && req.write(body);
  req.end();

  req.on('error', function (err) {
    callback && callback(err);
  });
}