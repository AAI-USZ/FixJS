function precondition(commands, fn) {
    /* Provide short-cut for single command. */
    if (!Array.isArray(commands)) {
      commands = [commands];
    }
    /* The user has access to proxies, but we want the variables. */
    commands = commands.map(function (proxy) {
      ASSERT(hd.isCommand(proxy),
        "expected precondition to guard command");
      return proxy.unwrap();
    });

    var vv = factory.addComputedVariable("precondition", fn);
    vv.guarded = commands;
  }