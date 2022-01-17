function() {
    if (wasApplied) {
      Class.PrototypeMixin = Ember.Mixin.create(Class.PrototypeMixin);
    }

    wasApplied = false;
  }