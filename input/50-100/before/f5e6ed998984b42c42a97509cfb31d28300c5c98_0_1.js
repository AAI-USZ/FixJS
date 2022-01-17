function(event) {
      event.view = view;
      event.context = context;

      // Check for StateManager (or compatible object)
      if (target.isState && typeof target.send === 'function') {
        return target.send(actionName, event);
      } else {
        return target[actionName].call(target, event);
      }
    }