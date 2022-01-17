function(frame) {
  if (frame.time - this.lastCompactTime_ <
      gf.sim.ClientSimulator.COMPACT_INTERVAL_) {
    return;
  }
  this.lastCompactTime_ = frame.time;

  // TODO(benvanik): stage this out over multiple ticks to prevent spikes
  // TODO(benvanik): compact dirty entities list?

  // Compact command lists
  this.incomingCommandList_.compact();
  this.outgoingCommandList_.compact();
}