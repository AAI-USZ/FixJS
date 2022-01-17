function(err, topicDetails) {
    if (err) {
      if (err.type === 'connectionerror') {
        return false;
      }
      // Just clear the view, when the data could not be loaded.
      console.log('Failed to load topic. Clearing view.');
      that.view.clear();
      return true;
    }
    var modelTopic = that.model.getTopic();
    if (modelTopic !== null && topicDetails !== undefined && topicDetails.id == modelTopic.id) { // Check that we still want to see this data
      that.setSelectedTopic(topicDetails);
      if (callback) {
        callback();
      }
    }
  }