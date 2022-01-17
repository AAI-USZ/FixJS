function(subject, data, callback) {
      if (callback == null) {
        callback = null;
      }
      return this.send(subject, data, callback);
    }