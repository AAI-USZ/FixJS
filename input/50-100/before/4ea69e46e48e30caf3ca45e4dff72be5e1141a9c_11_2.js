function(observer) {
  // Add to master list
  goog.asserts.assert(!goog.array.contains(this.observers_, observer));
  this.observers_.push(observer);

  // Track in the user->observer map
  var user = observer.user;
  if (user) {
    this.userObservers_[user.sessionId] = observer;
  }

  // TODO(benvanik): schedule creations for existing entities
}