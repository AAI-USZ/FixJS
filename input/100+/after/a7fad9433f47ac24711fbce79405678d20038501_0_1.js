function (method, uri /* variable arguments */) {
  var options, args = Array.prototype.slice.call(arguments),
      success = args.pop(),
      callback = args.pop(),
      body = typeof args[args.length - 1] === 'object' && args.pop();

  options = {
    timeout: 15 * 60 * 1000,
    method: method || 'GET',
    uri: this.remoteUri + uri,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  request(options, function (err, response, body) {
    if (err) {
      return callback(err);
    }

    var statusCode = response.statusCode.toString(),
        result,
        error;
        
    try {
      result = JSON.parse(body);
    }
    catch (ex) {
      // Ignore Errors
    }

    if (Object.keys(failCodes).indexOf(statusCode) !== -1) {
      error = new Error('haibu Error (' + statusCode + '): ' + failCodes[statusCode]);
      error.result = result;
      return callback(error);
    }

    success(response, result);
  });
}