function (script, options) {
  //
  // Simple bootstrapper for attaching logger
  // and watch plugins by default. Other plugins
  // can be attached through `monitor.use(plugin, options)`.
  //
  function bootstrap(monitor) {
    forever.plugins.logger.attach.call(monitor, options);
    if (options.watch) {
      forever.plugins.watch.attach.call(monitor, options);
    }
  }
  
  var self = this;

  //
  // Setup basic configuration options
  //
  options          = options || {};
  this.silent      = options.silent || false;
  this.killTree    = options.killTree !== false;
  this.uid         = options.uid || utile.randomString(4);
  this.pidFile     = options.pidFile || path.join(forever.config.get('pidPath'), this.uid + '.pid');
  this.max         = options.max;
  this.killTTL     = options.killTTL;
  this.childExists = false;
  this.checkFile   = options.checkFile !== false;
  this.times       = 0;
  this.warn        = console.error;

  this.logFile     = options.logFile || path.join(forever.config.get('root'), this.uid + '.log');
  this.outFile     = options.outFile;
  this.errFile     = options.errFile;
  this.append      = options.append;

  //
  // Setup restart timing. These options control how quickly forever restarts
  // a child process as well as when to kill a "spinning" process
  //
  this.minUptime     = typeof options.minUptime !== 'number' ? 0 : options.minUptime;
  this.spinSleepTime = options.spinSleepTime || null;

  //
  // Setup the command to spawn and the options to pass
  // to that command.
  //
  this.command   = options.command || 'node';
  this.args      = options.options || [];
  this.spawnWith = options.spawnWith || {};
  this.sourceDir = options.sourceDir;
  this.fork      = options.fork || false;
  this.cwd       = options.cwd || null;
  this.hideEnv   = options.hideEnv || [];
  this._env      = options.env || {};
  this._hideEnv  = {};

  //
  // Setup watch configuration options
  //
  this.watchIgnoreDotFiles = options.watchIgnoreDotFiles || true;
  this.watchIgnorePatterns = options.watchIgnorePatterns || [];
  this.watchDirectory      = options.watchDirectory || this.sourceDir;

  //
  // Create a simple mapping of `this.hideEnv` to an easily indexable
  // object
  //
  this.hideEnv.forEach(function (key) {
    self._hideEnv[key] = true;
  });

  if (Array.isArray(script)) {
    this.command = script[0];
    this.args = script.slice(1);
  }
  else {
    this.args.unshift(script);
  }
  
  if (this.sourceDir) {
    this.args[0] = path.join(this.sourceDir, this.args[0]);
  }
  
  //
  // Bootstrap this instance now that options
  // have been set
  //
  broadway.App.call(this, { bootstrapper: { bootstrap: bootstrap } });
}