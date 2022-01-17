function(target) {
    Ember.assert("You cannot append to an existing Ember.View. Consider using Ember.ContainerView instead.", !Ember.$(target).is('.ember-view') && !Ember.$(target).parents().is('.ember-view'));

    // Schedule the DOM element to be created and appended to the given
    // element after bindings have synchronized.
    this._insertElementLater(function() {
      this.$().appendTo(target);
    });

    return this;
  }