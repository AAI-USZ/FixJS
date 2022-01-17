function (retryDelay, maxRetry) {
      this.set('retry', true);
      this.set('maxRetry', maxRetry);
      this.set('retryDelay', _.ms(retryDelay));
      return this;
    }