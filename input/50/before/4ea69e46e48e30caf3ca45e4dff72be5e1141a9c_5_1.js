function(priority, targetTime) {
  this.simulator_.getScheduler().scheduleEvent(
      priority,
      targetTime,
      this.update, this);
}