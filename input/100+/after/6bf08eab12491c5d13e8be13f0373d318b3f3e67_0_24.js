function(event, currentState, context) {
    var log = this.enableLogging,
        action = currentState[event];

    // Test to see if the action is a method that
    // can be invoked. Don't blindly check just for
    // existence, because it is possible the state
    // manager has a child state of the given name,
    // and we should still raise an exception in that
    // case.
    if (typeof action === 'function') {
      if (log) { Ember.Logger.log(fmt("STATEMANAGER: Sending event '%@' to state %@.", [event, get(currentState, 'path')])); }
      return action.call(currentState, this, context);
    } else {
      var parentState = get(currentState, 'parentState');
      if (parentState) {
        return this.sendRecursively(event, parentState, context);
      } else if (get(this, 'errorOnUnhandledEvent')) {
        throw new Ember.Error(this.toString() + " could not respond to event " + event + " in state " + get(this, 'currentState.path') + ".");
      }
    }
  }