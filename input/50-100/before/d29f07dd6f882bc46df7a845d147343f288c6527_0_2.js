function(events, callback, context) {
    originalOn.apply(this, arguments);
    if (Coccyx.enforceContextualBinding && !context) throw "Coccyx: Backbone event binding attempted without a context."
    if (context && context.registerEventDispatcher) context.registerEventDispatcher(this);
  }