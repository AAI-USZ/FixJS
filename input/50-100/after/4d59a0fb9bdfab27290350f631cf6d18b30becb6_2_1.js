function(eventName) {
        return komoo.event.addListener(object, eventName, function(e, args) {
          return komoo.event.trigger(that, eventName, e, args);
        });
      }