function(frame) {
  // NOTE: updates to entity state (create/update/delete) have been done already
  //       in the netservice

  // Prepare entity states for update with interpolation/prediction
  this.interpolateEntities(frame.time);

  // Process incoming commands
  this.executeCommands(
      this.incomingCommandList_.getArray(),
      this.incomingCommandList_.getCount());
  this.incomingCommandList_.releaseAllCommands();

  // Run scheduled events
  this.getScheduler().update(frame);

  // Perform post-update work on entities that were marked as dirty
  this.postTickUpdateEntities(frame);

  // Flush any pending commands generated during this update
  this.sendPendingCommands_(frame);

  // Post update
  this.postUpdate(frame);

  // Compact, if needed - this prevents memory leaks from caches
  this.compact_();
}