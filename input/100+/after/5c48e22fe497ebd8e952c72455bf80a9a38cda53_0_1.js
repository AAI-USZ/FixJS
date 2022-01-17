function loadConfig() {
  // Parsing and setting up backends from the config file
  for(i in config.backends) {
    backends[i] = new httpProxy.HttpProxy({
      target: {
        host : config.backends[i].host,
        port : config.backends[i].port
      }
    });
    // Catch proxy errors and send 500
    backends[i].on('proxyError', function(err, req, res) {
      console.log(err);
      if(err.code == 'ECONNREFUSED') {
        console.log('Unable to proxy to target server. This probably means the target server '+
                    'is not listening on the given port or host');
      }
      res.writeHead(500, {'Content-type': 'text/html'});
      res.end('<h3> Internal Server Error </h3> Well this is embarrassing. Please try again.');
    });
  }
}