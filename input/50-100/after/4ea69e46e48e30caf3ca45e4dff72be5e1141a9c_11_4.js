function(frame) {
  // Process incoming commands for each observer
  for (var n = 0; n < this.observers_.length; n++) {
    var observer = this.observers_[n];
    observer.executeIncomingCommands();
  }

  // Run scheduled events
  this.getScheduler().update(frame);

  // Perform post-update work on entities that were marked as dirty, such
  // as queuing them for transmission
  this.postTickUpdateEntities(frame);

  // Flush observers of any pending changes, reset state
  this.postUpdate(frame);

  // Compact, if needed - this prevents memory leaks from caches
  this.compact_(frame);
}