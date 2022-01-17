function(priority, targetTime) {
  this.simulator.getScheduler().scheduleEvent(
      priority,
      targetTime,
      this.update, this);
}