function(event) {
    var curNode = event.currentTarget;
    if (! curNode)
      return;

    var innerRange = Meteor.ui._LiveRange.findRange(Meteor.ui._tag, curNode);
    if (! innerRange)
      return;

    var type = event.type;

    for(var range = innerRange; range; range = range.findParent()) {
      var event_handlers = range.event_handlers;
      if (! event_handlers)
        continue;

      for(var i=0, N=event_handlers.length; i<N; i++) {
        var h = event_handlers[i];

        if (h.type !== type)
          continue;

        var selector = h.selector;
        if (selector) {
          var contextNode = range.containerNode();
          var results = $(contextNode).find(selector);
          if (! _.contains(results, curNode))
            continue;
        } else {
          // if no selector, only match the event target
          if (curNode !== event.target)
            continue;
        }

        var event_data = findEventData(event.currentTarget);

        // Call the app's handler/callback
        var returnValue = h.callback.call(event_data, event);

        // allow app to `return false` from event handler, just like
        // you can in a jquery event handler
        if (returnValue === false) {
          event.stopImmediatePropagation();
          event.preventDefault();
        }
        if (event.isImmediatePropagationStopped())
          break; // stop handling by this and other event maps
      }
    }

  }