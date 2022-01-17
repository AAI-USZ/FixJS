function(msgEnvelopes) {
      _.each(msgEnvelopes, self.handleMessage, self);
    }