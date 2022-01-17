function() {
    realPushState = window.history.pushState;
    locationObject = Ember.Location.create({
      implementation: 'history'
    });

    stop();
    setTimeout(start, 1);
  }