function(stateManager, context) {
      if (Event && context instanceof Event) {
        context = context.context;
      }

      stateManager.transitionTo(target, context);
    }