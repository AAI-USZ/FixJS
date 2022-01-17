function(properties) {
  var options = {
        'host': this._options.host,
        'port': this._options.port,
        'method': (
                    typeof(properties.method) === 'string' &&
                    properties.method.match(this._methodMatch) !== null
                  ) ?
                  properties.method :
                  'GET',
        'path': '/' + (properties.path || ''),
        'auth': this._options.username + ':' + this._options.password,
        'headers': properties.headers || {}
      },
      request;

  // make sure, that we get application/json response from couchdb
  options.headers.Accept = options.headers.Accept || '*/*,application/json';
  options.headers['Content-Type'] = 'application/json';

  // set up request object
  request = http.request(
    options,
    this._request.bind(this, properties.callback)
  );

  // define callback, if there is an error
  request.on('error', (function(error) {
    properties.callback(error, null, null);
  }).bind(this));

  // adding optional body to the request
  if (properties.body) {
    if (typeof(properties.body) === 'object') {
      request.write(JSON.stringify(properties.body));
    } else {
      request.write(properties.body);
    }
  }

  // starting request
  request.end();
}