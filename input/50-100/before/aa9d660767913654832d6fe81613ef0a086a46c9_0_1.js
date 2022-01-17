function handleAfterFeatureEvent(event, callback) {
    self.addFeature(self.currentFeature);
    callback();
  }