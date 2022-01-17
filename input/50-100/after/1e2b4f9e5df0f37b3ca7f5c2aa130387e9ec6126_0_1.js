function() {
    if (!this.tokensPerInterval) {
      this.content = this.bucketSize;
      return;
    }
    
    var now = +new Date();
    var deltaMS = Math.max(now - this.lastDrip, 0);
    this.lastDrip = now;
    
    var dripAmount = deltaMS * (this.tokensPerInterval / this.interval);
    this.content = Math.min(this.content + dripAmount, this.bucketSize);
  }