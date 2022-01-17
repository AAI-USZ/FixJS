function() {
    var guid = Ember.guidFor(this);

    Ember.$(window).unbind('hashchange.ember-location-'+guid);
  }