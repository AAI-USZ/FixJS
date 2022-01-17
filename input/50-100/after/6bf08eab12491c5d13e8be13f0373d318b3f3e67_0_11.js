function() {
    var labelPath = get(this, 'parentView.optionLabelPath');

    if (!labelPath) { return; }

    Ember.defineProperty(this, 'label', Ember.computed(function() {
      return get(this, labelPath);
    }).property(labelPath).cacheable());
  }