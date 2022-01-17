function handleAfterFeaturesEvent(event, callback) {
    var feature = event.getPayloadItem('feature');
    console.log('ending:',feature.getName()); 
    callback();
  }