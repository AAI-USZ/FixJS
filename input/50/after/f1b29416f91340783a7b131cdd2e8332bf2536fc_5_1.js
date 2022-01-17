function(eventName) {
        // we only care about the greater 'change' event.  The "change:__" events are ignored.
        if (eventName.indexOf("change:") == -1) {
          Tapedeck.Backend.MessageHandler.updateView("Queue");
        }
      }