function handleAfterFeatureEvent(event, callback) {
    self.addFeature(self.currentFeature);
    var feature = event.getPayloadItem('feature');
    console.log('ending:',feature.getName()); 
    callback();
  }