function onSessionContext(msg, result) {
    var self=this;

    // defend against onSessionContext being called multiple times
    if (self.sessionContextHandled) return;
    self.sessionContextHandled = true;

    // Publish any outstanding data.  Unless this is a continuation, previous
    // session data must be published independently of whether the current
    // dialog session is allowed to sample data. This is because the original
    // dialog session has already decided whether to collect data.

    model.stageCurrent();
    publishStored.call(self);

    // set the sample rate as defined by the server.  It's a value
    // between 0..1, integer or float, and it specifies the percentage
    // of the time that we should capture
    var sampleRate = result.data_sample_rate || 0;

    if (typeof self.samplingEnabled === "undefined") {
      // now that we've got sample rate, let's smash it into a boolean
      // probalistically
      self.samplingEnabled = Math.random() <= sampleRate;
    }

    // if we're not going to sample, kick out early.
    if (!self.samplingEnabled) {
      return;
    }

    // server_time is sent in milliseconds. The promise to users and data
    // safety is the timestamp would be at a 10 minute resolution.  Round to the
    // nearest 10 minute mark.
    var TEN_MINS_IN_MS = 10 * 60 * 1000,
        roundedServerTime = Math.round(result.server_time / TEN_MINS_IN_MS) * TEN_MINS_IN_MS;

    var currentData = {
      event_stream: self.initialEventStream,
      sample_rate: sampleRate,
      timestamp: roundedServerTime,
      local_timestamp: self.startTime.toString(),
      lang: dom.getAttr('html', 'lang') || null,
    };

    if (window.screen) {
      currentData.screen_size = {
        width: window.screen.width,
        height: window.screen.height
      };
    }

    // cool.  now let's persist the initial data.  This data will be published
    // as soon as the first session_context completes for the next dialog
    // session.  Use a push because old data *may not* have been correctly
    // published to a down server or erroring web service.
    model.push(currentData);

    self.initialEventStream = null;

    self.samplesBeingStored = true;
  }