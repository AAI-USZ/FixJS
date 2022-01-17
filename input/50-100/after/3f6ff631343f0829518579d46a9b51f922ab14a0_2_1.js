function() {
        console.log("Connection closed...");
        _publish(handlers, Message.ConnectionClosed());
      }