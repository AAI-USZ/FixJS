function() {
    var modelType = get(this, 'modelType');

    if (typeof modelType === 'string') {
      return Ember.getPath(window, modelType);
    } else {
      return modelType;
    }
  }