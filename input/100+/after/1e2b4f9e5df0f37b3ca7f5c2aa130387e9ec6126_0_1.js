function(count, callback) {
    var self = this;

    // Is this an infinite size bucket?
    if (!this.bucketSize) {
      callback(null, count, Number.POSITIVE_INFINITY);
      return true;
    }
    
    // Make sure the bucket can hold the requested number of tokens
    if (count > this.bucketSize) {
      callback('Requested tokens ' + count + ' exceeds bucket size ' +
        this.bucketSize, null);
      return false;
    }
    
    // Drip new tokens into this bucket
    this.drip();
    
    // If we don't have enough tokens in this bucket, come back later
    if (count > this.content) {
      // How long do we need to wait to make up the difference in tokens?
      var waitInterval = Math.ceil(
        (count - this.content) * (this.interval / this.tokensPerInterval));
      setTimeout(function() { self.removeTokens(count, callback); }, waitInterval);
      return false;
    }
    
    if (this.parentBucket) {
      // Remove the requested from the parent bucket first
      return this.parentBucket.removeTokens(count, function(err, remainingTokens) {
        if (err) {
          callback(err, null);
          return;
        }
        
        // Tokens were removed from the parent bucket, now remove them from
        // this bucket and fire the callback. Note that we look at the current
        // bucket and parent bucket's remaining tokens and return the smaller
        // of the two values
        self.content -= count;
        callback(null, Math.min(remainingTokens, self.content));
      })
    } else {
      // Remove the requested tokens from this bucket and fire the callback
      this.content -= count;
      callback(null, this.content);
      return true;
    }
  }