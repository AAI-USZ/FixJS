function(key) {
    var desc = meta(get(this, 'proto'), false).descs[key];

    ember_assert("metaForProperty() could not find a computed property with key '"+key+"'.", !!desc && desc instanceof Ember.ComputedProperty);
    return desc._meta || {};
  }