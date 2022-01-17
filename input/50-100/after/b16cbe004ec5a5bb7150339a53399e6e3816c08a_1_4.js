function(event, context) {
    Ember.assert('Cannot send event "' + event + '" while currentState is ' + get(this, 'currentState'), get(this, 'currentState'));
    return this.sendRecursively(event, get(this, 'currentState'), context);
  }