function (name, module) {
    if (module.uninit) { module.uninit.call(module); }
    module.listeners.forEach(function (listener) {
      console.log('removing listener for', listener[0]);
      chan.network.removeListener(listener[0], listener[1]);
    });
    module.timers.forEach(clearInterval);
  }