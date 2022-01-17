function (url, args, callback, context) {
  if (typeof args === 'function') {
    context = callback;
    callback = args;
    args = null;
  }
  args = args || {};
  args.timeout = args.timeout || exports.TIMEOUT;
  args.type = (args.type || 'GET').toUpperCase();
  var info = urlutil.parse(url);
  var method = args.type;
  var request_method = http.request;
  var port = info.port || 80;
  if (info.protocol === 'https:') {
    request_method = https.request;
    if (!info.port) {
      port = 443;
    }
  }
  var options = {
    host: info.hostname,
    path: info.path || '/',
    method: method,
    port: port,
    agent: exports.agent,
    headers: args.headers || {}
  };
  var body = args.content || args.data;
  if (!args.content) {
    if (body && !(body instanceof String || body instanceof Buffer)) {
      body = qs.stringify(body);
    }
  }
  if (method === 'GET' && body) {
    options.path += (info.query ? '' : '?') + body;
    body = null;
  }
  if (body) {
    options.headers['Content-Length'] = body.length;
  }
  var timer = null;
  var req = request_method(options, function (res) {
    var chunks = [], size = 0;
    res.on('data', function (chunk) {
      size += chunk.length;
      chunks.push(chunk);
    });
    res.on('end', function () {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      var data = null;
      switch (chunks.length) {
      case 0: 
        data = new Buffer(0); 
        break;
      case 1: 
        data = chunks[0]; 
        break;
      default:
        data = new Buffer(size);
        for (var i = 0, pos = 0, l = chunks.length; i < l; i++) {
          chunks[i].copy(data, pos);
          pos += chunks[i].length;
        }
        break;
      }
      callback.call(context, null, data, res);
    });
  });
  var timeout = args.timeout;
  timer = setTimeout(function () {
    timer = null;
    req.__isTimeout = true;
    req.abort();
  }, timeout);
  req.on('error', function (err) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (req.__isTimeout) {
      err.name = 'RequestTimeoutError';
      err.message = err.message + ', request timeout for ' + timeout + 'ms.';
    } else {
      err.name = 'RequestError';
    }
    callback.call(context, err);
  });
  req.end(body);
}