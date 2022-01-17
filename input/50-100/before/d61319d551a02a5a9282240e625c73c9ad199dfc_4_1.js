function startService(name, options) {
    // Only one service outside of the main dialog allowed.
    if(runningService) {
      serviceManager.stop(runningService);
    }
    var module = serviceManager.start(name, options);
    if(module) {
      runningService = name;
    }

    mediator.publish("service", { name: name });
    bid.resize();

    return module;
  }