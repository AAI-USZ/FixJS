function(frame) {
  if (frame.time - this.lastCompactTime_ <
      gf.sim.ServerSimulator.COMPACT_INTERVAL_) {
    return;
  }
  this.lastCompactTime_ = frame.time;

  // TODO(benvanik): stage this out over multiple ticks to prevent spikes
  // TODO(benvanik): compact dirty entities list?

  // Compact command lists
  this.cleanupCommandList_.compact();

  // Compact all observers
  for (var n = 0; n < this.observers_.length; n++) {
    var observer = this.observers_[n];
    observer.compact();
  }
}