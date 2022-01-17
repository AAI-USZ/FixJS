function(queue) {
      sqcr.queue = queue
      sqcr.setQueuePosition(-1);

      var updateQueue = function() {
        Tapedeck.Backend.MessageHandler.updateView("Queue");
      }
      sqcr.queue.destination = "Queue"; // set this so we handle the tracklist differently in templates
      sqcr.queue.bind('add', updateQueue);
      sqcr.queue.bind('remove', updateQueue);
      sqcr.queue.bind('reset', updateQueue);
      sqcr.queue.bind('change tracks', updateQueue);
      callback();
    }