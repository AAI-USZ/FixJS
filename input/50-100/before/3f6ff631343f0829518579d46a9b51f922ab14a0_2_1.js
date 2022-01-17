function(ws, handlers) {
      if (ws == null)
        return;
      ws.onopen = function() {
        // TODO: do something meaningful here
      };
      ws.onmessage = function(event) {
        console.log("Message received...", event);
        _publish(handlers, adt.deserialize(event.data));
      };
    }