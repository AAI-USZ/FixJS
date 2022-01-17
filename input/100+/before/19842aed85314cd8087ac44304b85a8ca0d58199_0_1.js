function(action, type, arg, context) {
    var pubtype = type || 'any', subscribers = this.subscribers[pubtype], i, max = subscribers ? subscribers.length
        : 0;

    for (i = 0; i < max; i += 1) {
      if (action === 'publish') {
        subscribers[i].fn.call(subscribers[i].context, arg);
      } else {
        if (subscribers[i].context === context) {
          subscribers.splice(i, 1);
          debug("Removed subscribers");

        } else {
          debug("Not removing subscriber" + i);

        }
      }
    }
  }