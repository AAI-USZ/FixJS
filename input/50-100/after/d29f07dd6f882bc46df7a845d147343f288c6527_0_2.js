function(events, callback, context) {
    var returnValue = originalOn.apply(this, arguments);
    if (Coccyx.enforceContextualBinding && !context) throw "Coccyx: Backbone event binding attempted without a context."
    if (context && context.registerEventDispatcher) context.registerEventDispatcher(this);
    return returnValue;
  }