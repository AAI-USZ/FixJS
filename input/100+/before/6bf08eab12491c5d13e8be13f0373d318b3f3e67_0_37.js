function(actionName, eventName, target, view, context, link) {
  var actionId = (++Ember.$.uuid).toString();

  ActionHelper.registeredActions[actionId] = {
    eventName: eventName,
    handler: function(event) {
      if (link && (event.button !== 0 || event.shiftKey || event.metaKey || event.altKey || event.ctrlKey)) {
        // Allow the browser to handle special link clicks normally
        return;
      }

      event.preventDefault();

      event.view = view;
      event.context = context;

      // Check for StateManager (or compatible object)
      if (target.isState && typeof target.send === 'function') {
        return target.send(actionName, event);
      } else {
        Ember.assert(Ember.String.fmt('Target %@ does not have action %@', [target, actionName]), target[actionName]);
        return target[actionName].call(target, event);
      }
    }
  };

  view.on('willRerender', function() {
    delete ActionHelper.registeredActions[actionId];
  });

  return actionId;
}