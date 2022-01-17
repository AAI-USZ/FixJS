function(config) {
      // Any time the context info changes, we want to know about it.
      mediator.subscribe('context_info', onContextChange);

      // BEGIN TEST API
      this.cookiesEnabledOverride = config && config.cookiesEnabledOverride;
      // END TEST API

      clearContext();
    }