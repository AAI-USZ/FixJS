function() {
    set(this, 'location', get(this, 'location') || window.location);
    set(this, 'callbacks', Ember.A());
  }