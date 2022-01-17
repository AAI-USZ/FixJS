function loadBackend(config, name) {
  var backendmod = require(name);

  if (config.debug) {
    l.log("Loading backend: " + name, 'debug');
  }

  var ret = backendmod.init(startup_time, config, backendEvents);
  if (!ret) {
    l.log("Failed to load backend: " + name);
    process.exit(1);
  }
}