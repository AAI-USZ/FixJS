function() {
    set(this, 'location', get(this, 'location') || window.location);
    set(this, '_initialURL', get(this, 'location').pathname);
    set(this, 'callbacks', Ember.A());
  }