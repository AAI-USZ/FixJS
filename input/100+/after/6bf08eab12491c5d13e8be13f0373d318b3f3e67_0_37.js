function(actionName, options) {
  var actionId = (++Ember.$.uuid).toString();

  ActionHelper.registeredActions[actionId] = {
    eventName: options.eventName,
    handler: function(event) {
      var modifier = event.shiftKey || event.metaKey || event.altKey || event.ctrlKey,
          secondaryClick = event.which > 1, // IE9 may return undefined
          nonStandard = modifier || secondaryClick;

      if (options.link && nonStandard) {
        // Allow the browser to handle special link clicks normally
        return;
      }

      event.preventDefault();

      event.view = options.view;

      if (options.hasOwnProperty('context')) {
        event.context = options.context;
      }

      var target = options.target;

      // Check for StateManager (or compatible object)
      if (target.isState && typeof target.send === 'function') {
        return target.send(actionName, event);
      } else {
        Ember.assert(Ember.String.fmt('Target %@ does not have action %@', [target, actionName]), target[actionName]);
        return target[actionName].call(target, event);
      }
    }
  };

  options.view.on('willRerender', function() {
    delete ActionHelper.registeredActions[actionId];
  });

  return actionId;
}