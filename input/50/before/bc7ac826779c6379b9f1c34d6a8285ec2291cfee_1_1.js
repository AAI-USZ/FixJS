function (retryDelay, maxTries) {
      this.set('retry', true);
      this.set('maxTries', maxTries);
      this.set('retryDelay', _.ms(retryDelay));
      return this;
    }