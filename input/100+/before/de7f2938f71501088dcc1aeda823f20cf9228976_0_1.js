function Child (proc) {
  // setup process
  this.proc = proc;
  proc.on('message', messageHandler.bind(this));

  // try to parse config
  var config = proc.env.COHESION_CONFIG;
  if (config) {
    try { this.config = JSON.parse(config); }
    catch (ex) { this.config = {}; }
  } else {
    this.config = {};
  }

  // setup ping handler
  this.timer = setInterval(pingHandler.bind(this), 10000);
  this.emit = emit;
}