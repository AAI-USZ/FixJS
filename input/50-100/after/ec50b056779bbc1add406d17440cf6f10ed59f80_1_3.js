function (name, module) {
    chan.log.debug('Unloading module', name)
    if (module.uninit) { module.uninit.call(module); }
    module.listeners.forEach(function (listener) {
      chan.network.removeListener(listener[0], listener[1]);
    });
    module.intervalIDs.forEach(clearInterval);
  }