function subscribe(evt, cb, context) {
    var subscribers = this.subscribers;
    if (!(subscribers.hasOwnProperty(evt))) {
      subscribers[evt] = [];
    }

    var cbWrapped = function cbWrapped(args) {
      try {
        cb.apply(context, args);
      } catch (e) {
        /* Unsubscribe itself. */
        var subscriptions = subscribers[evt];
        var index = subscriptions.indexOf(cbWrapped);
        subscriptions.splice(index, 1);
      }
    };

    subscribers[evt].push(cbWrapped);
  }