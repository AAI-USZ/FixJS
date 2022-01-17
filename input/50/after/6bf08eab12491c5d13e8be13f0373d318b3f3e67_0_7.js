function() {
    reopen.apply(this.ClassMixin, arguments);
    Ember.Mixin._apply(this, arguments, false);
    return this;
  }