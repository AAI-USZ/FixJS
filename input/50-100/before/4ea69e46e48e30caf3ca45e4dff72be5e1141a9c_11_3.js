function(observer) {
  // Untrack in the user->observer map
  var user = observer.user;
  if (user) {
    delete this.userObservers_[user.sessionId];
  }

  // Remove from list and dispose (we own it)
  goog.array.remove(this.observers_, observer);
  goog.dispose(observer);
}