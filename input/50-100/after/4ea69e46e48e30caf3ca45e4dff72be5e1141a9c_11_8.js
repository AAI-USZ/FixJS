function(user) {
  // Ensure no existing observer - not sure this is possible
  var observer = this.simulator_.getObserverForUser(user);
  if (observer) {
    return;
  }

  // Create the observer and add to the simulator
  observer = new this.simulator_.observerCtor_(
      this.simulator_, this.session_, user);
  this.simulator_.addObserver(observer);
}