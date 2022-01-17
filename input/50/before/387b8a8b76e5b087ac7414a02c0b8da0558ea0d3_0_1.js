function(config) {
      // Any time the context info changes, we want to know about it.
      mediator.subscribe('context_info', onContextChange);

      clearContext();
    }