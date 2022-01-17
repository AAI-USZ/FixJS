function() {
    _.bindAll(this, "sync");

    this.set({
      zoomLevel: this.defaultZoomLevel,
      bucketSize: this.calculateBucketSize(this.defaultZoomLevel),
      maxRows: this.defaultMaxRows,
      lastEndTime: nearestHour(),
      bucketCount: this.defaultBucketCount
    });
    this.aggregates = this.get('aggregates');   // Pull the aggregates collection out as a top-level attribute
    this.domain = this.get('domain');

    var self = this;
    this.hiddenPairs = this.domain.hiddenPairs;

    var fireBucketChange = function() { self.trigger('change:buckets'); };
    this.aggregates.on('add', fireBucketChange);
    this.aggregates.on('change', fireBucketChange);

    // The two different end time properties should event out as changes to the start time
    this.on('change:fixedEndTime', function() { self.trigger('change:startTime'); });
    this.on('change:lastEndTime', function() { self.trigger('change:startTime'); });
  }