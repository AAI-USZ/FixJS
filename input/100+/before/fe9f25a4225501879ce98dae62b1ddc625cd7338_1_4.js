function () {
  var chan = this;

  function initModule(name, config) {
    chan.log.info('Loading module', {name: name, config: config});
    // Load module or override.
    try { var module = chan.modules[name] = chan.overrides[name] ?
            chan.overrides[name] : require(chan.modulePath + name + '/module'); }
    catch(e) { chan.log.exception(e, 'Loading module failed'); }

    module.listeners = [];
    module.timers = [];
    module.context = {
      io: chan.io,
      config: config,
      log: new log(name, chan.modulePath + name + '/module.log')
    };
    // If the module requires special initialization, let's do it here.
    if (module.init) {
      try { module.init.call(module); }
      catch (e) { chan.log.exception(e, 'Module init failed'); }
    }
    // Register commands/routes/events etc.
    each(module.routes, function (n, route) { chan.registerRoute(module, n, route); }, chan);
    each(module.commands, function (n, cmd) { chan.registerCommand(module, n, cmd); }, chan);
    each(module.events, function (n, event) { chan.registerEvent(module, n, event); }, chan);
    each(module.intervals, function (n, intv) { chan.registerInterval(module, n, intv); }, chan);
  }

  // Initialize modules
  each(this.config.modules, initModule);
}