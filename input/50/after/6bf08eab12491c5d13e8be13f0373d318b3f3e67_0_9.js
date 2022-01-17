function() {
    var modelType = get(this, 'modelType');

    if (typeof modelType === 'string') {
      return Ember.get(window, modelType);
    } else {
      return modelType;
    }
  }