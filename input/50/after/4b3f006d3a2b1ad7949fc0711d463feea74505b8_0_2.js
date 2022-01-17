function() {
    Ember.assert("Can't set ObjectProxy's content to itself", this.get('content') !== this);
  }