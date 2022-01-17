function(callback) {
      var self = this;

      self._setupProvider();

      this.provider.setupConnection(function(err, data) {
        if (err) {
          callback(err);
          return;
        }

        if ('url' in data) {
          self.url = data.url;
        }

        if ('domain' in data) {
          self.domain = data.domain;
        }

        // update provider
        self._setupProvider();

        callback(null, self);
      });
    }