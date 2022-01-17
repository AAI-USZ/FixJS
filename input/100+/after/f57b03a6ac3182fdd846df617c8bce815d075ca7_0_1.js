function (command, parameters) {
  var map = {
    AWSAccessKeyId: process.env['AWS_ACCESS_KEY_ID'],
    Action: command,
    SignatureMethod: 'HmacSHA256',
    Timestamp: this.timestampBuilder(),
    SignatureVersion: 2,
    Version: '2010-08-01'
  };
  for (key in parameters) {
    map[key] = typeof parameters[key] === 'function' ? parameters[key]() : parameters[key];
  }
  var names = (function () {
    var _results;
    _results = [];
    for (key in map) {
      parameters[key] = map[key];
      _results.push(key);
    }
    return _results;
  })();
  names.sort();
  var query = [];
  for (_i = 0, _len = names.length; _i < _len; _i++) {
    name = names[_i];
    query.push(querystring.escape(name) + '=' + querystring.escape(map[name]));
  }
  var cloudwatch_host = 'monitoring.' + region + '.amazonaws.com';
  var toSign = 'GET\n' + (cloudwatch_host + '\n') + '/\n' + query.join('&');
  var hmac = crypto.createHmac('sha256', process.env['AWS_SECRET_ACCESS_KEY']);
  hmac.update(toSign);
  var digest = querystring.escape(hmac.digest('base64'));
  query.push('Signature=' + digest);
  return query;
}