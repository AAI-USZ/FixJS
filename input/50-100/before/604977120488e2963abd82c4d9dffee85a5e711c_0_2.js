function (data) {
      // first message we get when we're connecting goes to _connected,
      // which connects us. All subsequent messages (while connected) go to
      // the callback.
      if (self.current_status.status === "connecting")
        self._connected(data.data);
      else if (self.current_status.connected)
        _.each(self.event_callbacks.message, function (callback) {
          try {
            callback(data.data);
          } catch (e) {
            // XXX sockjs catches and silently ignores any exceptions
            // that we raise here. not sure what we should do, but for
            // now, just print the exception so you are at least aware
            // that something went wrong.
            // XXX improve error message
            Meteor._debug("Exception while processing message", e.stack);
          }
        });
    }