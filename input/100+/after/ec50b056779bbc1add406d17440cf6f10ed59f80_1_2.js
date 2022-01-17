function initModule(name, config) {
    chan.log.info('Loading module', {name: name, config: config});

    try { // Load module or override.
      var module = chan.modules[name] = chan.overrides[name] ?
        chan.overrides[name] : require(chan.modulePath + name + '/module');
    } catch(e) {
      chan.log.exception(e, 'Loading module failed');
      delete chan.modules[name];
      return;
    }

    module.listeners = [];
    module.intervalIDs = [];
    module.context = {
      io: chan.io,
      config: config,
      log: new log(name, chan.modulePath + name + '/module.log')
    };

    // If the module requires special initialization, let's do it here.
    if (module.init) {
      try {
        module.init.call(module);
      } catch (e) {
        console.error('%s Module %s init failed!', 'ERROR'.red, name.yellow);
        chan.log.exception(e, 'Module init failed');
        delete chan.modules[name];
        return;
      }
    }
    // Register commands/routes/events etc.
    each(module.routes, function (n, route) { chan.registerRoute(module, n, route); }, chan);
    each(module.commands, function (n, cmd) { chan.registerCommand(module, n, cmd); }, chan);
    each(module.events, function (n, event) { chan.registerEvent(module, n, event); }, chan);
    each(module.intervals, function (n, intv) { chan.registerInterval(module, n, intv); }, chan);
  }