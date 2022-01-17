function fire(message) {
    for(var j = 0, glistener; glistener = globalListeners[j]; ++j) {
      // global listeners get the message name as the first argument
      glistener.callback.apply(null, arguments);
    }

    var messageListeners = listeners[message];

    if(messageListeners) {
      // XXX: deviation from upstream!  upstream code doesn't pass
      // 'message' as the first argument.  our code expects it.
      // at some point we should modify all callers of hub.on() to
      // not expect first arg to be message.
      for(var i = 0, listener; listener = messageListeners[i]; ++i) {
        listener.callback.apply(null, arguments);
      }
    }
  }