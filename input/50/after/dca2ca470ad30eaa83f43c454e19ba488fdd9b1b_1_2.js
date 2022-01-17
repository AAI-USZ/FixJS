function() {
    window.history.pushState = realPushState;
    window.history.state = realHistoryState;
    Ember.run(function() {
      locationObject.destroy();
    });
  }