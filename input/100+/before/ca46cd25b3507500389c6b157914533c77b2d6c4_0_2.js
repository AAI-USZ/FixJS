function initModule(name, config) {
    console.log(chan.name.green, 'Loading module', name.green, config);

    // Load module or override.
    var module = chan.modules[name] = chan.overrides[name] ?
      chan.overrides[name] : require(chan.modulePath + name + '/module');
    console.log(name);
    module.instance = chan.modules[name].init(config, chan.io);
    console.dir(module);
    // Register commands/routes/events etc.
    each(module.routes, function (name, route) { chan.registerRoute(module, name, route); }, chan);
    each(module.commands, function (name, cmd) { chan.registerCommand(module, name, cmd); }, chan);
    each(module.events, function (name, event) { chan.registerEvent(module, name, event); }, chan);
  }