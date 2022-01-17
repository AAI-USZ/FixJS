function(stateManager, context) {
      if (Event && context instanceof Event) {
        if (context.hasOwnProperty('context')) {
          context = context.context;
        } else {
          // If we received an event and it doesn't contain
          // a context, don't pass along a superfluous
          // context to the target of the event.
          return stateManager.transitionTo(target);
        }
      }

      stateManager.transitionTo(target, context);
    }