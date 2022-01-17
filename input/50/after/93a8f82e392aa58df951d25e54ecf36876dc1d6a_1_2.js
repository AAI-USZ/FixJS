function() {
    var guid = Ember.guidFor(this);

    Ember.$(window).unbind('popstate.ember-location-'+guid);
  }