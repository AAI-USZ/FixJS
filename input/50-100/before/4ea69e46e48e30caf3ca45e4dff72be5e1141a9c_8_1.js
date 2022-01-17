function(command) {
  // Add to the incoming list
  this.incomingCommandList_.addCommand(command);

  // If a predicted command then update the sequence number
  if (command instanceof gf.sim.PredictedCommand) {
    goog.asserts.assert(sequence > this.confirmedSequence_);
    observer.confirmSequence(command.sequence);
    this.confirmedSequence_ = sequence;
  }
}