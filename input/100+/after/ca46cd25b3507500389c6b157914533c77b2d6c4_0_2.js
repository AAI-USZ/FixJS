function initModule(name, config) {
    console.log(chan.name.green, 'Loading module', name.green, config);
    // Load module or override.
    var module = chan.modules[name] = chan.overrides[name] ?
      chan.overrides[name] : require(chan.modulePath + name + '/module');
    module.listeners = [];
    module.context = {
      io: chan.io,
      config: config
    };
    // Register commands/routes/events etc.
    each(module.routes, function (n, route) { chan.registerRoute(module, n, route); }, chan);
    each(module.commands, function (n, cmd) { chan.registerCommand(module, n, cmd); }, chan);
    each(module.events, function (n, event) { chan.registerEvent(module, n, event); }, chan);
  }