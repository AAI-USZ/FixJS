function(queue) {
      sqcr.queue = queue
      sqcr.setQueuePosition(-1);

      var updateQueue = function(eventName) {
        // we only care about the greater 'change' event.  The "change:__" events are ignored.
        if (eventName.indexOf("change:") == -1) {
          Tapedeck.Backend.MessageHandler.updateView("Queue");
        }
      }
      sqcr.queue.destination = "Queue"; // set this so we handle the tracklist differently in templates
      sqcr.queue.bind('all', updateQueue);
      callback();
    }