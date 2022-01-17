function (options) {
  var isArray = Array.isArray(options.after),
      credentials;

  if (!options) {
    throw new Error('options is required to create a server');
  }

  function requestHandler(req, res) {
    var routingStream = new RoutingStream({
      before: options.before,
      buffer: options.buffer,
      //
      // Remark: without new after is a huge memory leak that
      // pipes to every single open connection
      //
      after: isArray && options.after.map(function (After) {
        return new After;
      }),
      request: req,
      response: res,
      limit: options.limit,
      headers: options.headers
    });

    routingStream.on('error', function (err) {
      var fn = options.onError || core.errorHandler;
      fn(err, routingStream, routingStream.target, function () {
        routingStream.target.emit('next');
      });
    });

    req.pipe(routingStream);
  }

  //
  // both https and spdy requires same params
  //
  if (options.https || options.spdy) {

    var key;

    if(options.spdy) {
      key = 'spdy';
    } else {
      key = 'https';
    }

    server_options = options[key];

    if (!server_options.key || !server_options.cert) {
      throw new Error('Both options.'+key+'.`key` and options.'+key+'.`cert` are required.');
    }

    credentials = {
      key: fs.readFileSync(server_options.key),
      cert: fs.readFileSync(server_options.cert)
    };

    if (server_options.ca) {
      credentials.ca = fs.readFileSync(server_options.ca);
    }

    if(options.spdy){
      // spdy is optional so we require module here rather than on top
      var spdy = require('spdy');
      return spdy.createServer(credentials, requestHandler);
    }

    return https.createServer(credentials, requestHandler);
  }

  return http.createServer(requestHandler);
}