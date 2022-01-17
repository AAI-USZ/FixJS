function (server) {
  server.on('request', function(req, res) {
    var matched = false;
    for(i in config.router) {
      if(req.url.match(i)) {
        //console.log(req.headers);
        log_data.logProxyData(req, config.router[i]);
        //console.log(req.url, ' proxying to ', config.router[i]);
        backends[config.router[i]].proxyRequest(req, res);
        matched = true;
        break;
      }
    }
    if(!matched) {
      //console.log(req.headers);
      //console.log(req.url);
      //console.log(req.url, ' proxying to default backend');
      //console.log('x-forwarded',req.headers['x-forwarded-proto']);
      log_data.logProxyData(req, 'default backend');
      backends.default_backend.proxyRequest(req, res);
    }
  });

  server.on('upgrade', function(req, socket, head) {
    console.log('UPGRADING HEADER FOUND!');
    //console.log(req.headers);
    //console.log(req.url, ' proxying to ', config.onUpgrade);
    log_data.logUpgradeData(req, config.onUpgrade);
    backends[config.onUpgrade].proxyWebSocketRequest(req, socket, head);
  });

  // Error Handling
  server.on('uncaughtException', function(err) {
    console.error('uncaughtException: ', err.message);
    console.error(err.stack);
  });

  server.on('error', function(err) {
    console.error('Server encountered error: ', err.message);
    console.error(err.stack);
  });
}