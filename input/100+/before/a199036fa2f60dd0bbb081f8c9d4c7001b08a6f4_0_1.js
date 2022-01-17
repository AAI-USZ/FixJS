function(bucketSize, tokensPerInterval, interval, parentBucket) {
  console.log('new bucket of size: ' + bucketSize);

  this.bucketSize = bucketSize;
  this.tokensPerInterval = tokensPerInterval;
  
  if (typeof interval === 'string') {
    switch (interval) {
      case 'sec': case 'second':
        this.interval = 1000; break;
      case 'min': case 'minute':
        this.interval = 1000 * 60; break;
      case 'hr': case 'hour':
        this.interval = 1000 * 60 * 60; break;
      case 'day':
        this.interval = 1000 * 60 * 60 * 24; break;
    }
  } else {
    this.interval = interval;
  }
  
  this.parentBucket = parentBucket;
  this.content = 0;
  this.lastDrip = +new Date();
}