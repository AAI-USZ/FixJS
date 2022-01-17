function(msgEnvelopes) {
      _.each(msgEnvelopes, this.handleMessage, this);
    }