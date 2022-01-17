function(target) {
    // Schedule the DOM element to be created and appended to the given
    // element after bindings have synchronized.
    this._insertElementLater(function() {
      Ember.assert("You cannot append to an existing Ember.View. Consider using Ember.ContainerView instead.", !Ember.$(target).is('.ember-view') && !Ember.$(target).parents().is('.ember-view'));
      this.$().appendTo(target);
    });

    return this;
  }