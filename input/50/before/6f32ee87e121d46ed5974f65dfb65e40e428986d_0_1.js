function handleBeforeFeatureEvent(event, callback) {
    var feature = event.getPayloadItem('feature');
    self.currentFeature = self.buildFeature(feature);
    callback();
  }