function(options) {
      options = options || {};

      var self = this;

      // options.samplingEnabled is used for testing purposes.
      //
      // If samplingEnabled is not specified in the options, and this is not
      // a continuation, samplingEnabled will be decided on the first "
      // context_info" event, which corresponds to the first time
      // 'session_context' returns from the server.
      // samplingEnabled flag ignored for a continuation.
      self.samplingEnabled = options.samplingEnabled;

      // continuation means the users dialog session is continuing, probably
      // due to a redirect to an IdP and then a return after authentication.
      if (options.continuation) {
        // There will be no current data if the previous session was not
        // allowed to save.
        var previousData = model.getCurrent();
        if (previousData) {
          self.startTime = Date.parse(previousData.local_timestamp);


          // instead of waiting for session_context to start appending data to
          // localStorage, start saving into localStorage now.
          self.samplingEnabled = self.samplesBeingStored = true;
        }
        else {
          // If there was no previous data, that means data collection
          // was not allowed for the previous session.  Return with no further
          // action, data collection is not allowed for this session either.
          self.samplingEnabled = false;
          return;
        }
      }
      else {
        self.startTime = new Date();

        // The initialEventStream is used to store events until onSessionContext
        // is called.  Once onSessionContext is called and it is known whether
        // the user's data will be saved, initialEventStream will either be
        // discarded or added to the data set that is saved to localmodel.
        self.initialEventStream = [];
        self.samplesBeingStored = false;

        // whenever session_context is hit, let's hear about it so we can
        // extract the information that's important to us (like, whether we
        // should be running or not)
        self.contextInfoHandle = this.subscribe('context_info', onSessionContext);
      }

      // on all events, update event_stream
      this.subscribeAll(addEvent);
    }