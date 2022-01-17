function() {
    var valuePath = get(this, 'parentView.optionValuePath');

    if (!valuePath) { return; }

    Ember.defineProperty(this, 'value', Ember.computed(function() {
      return get(this, valuePath);
    }).property(valuePath).cacheable());
  }