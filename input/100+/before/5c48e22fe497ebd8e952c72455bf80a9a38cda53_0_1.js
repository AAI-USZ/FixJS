function loadConfig() {

  // Parsing and setting up backends from the config file
  for(i in config.backends) {
    var target = {};
    target.host = config.backends[i].host;
    target.port = config.backends[i].port;
    backends[i] = new httpProxy.HttpProxy({target: target});
  }
}