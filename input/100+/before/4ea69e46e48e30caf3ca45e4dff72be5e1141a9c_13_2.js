function(writer) {
  goog.asserts.assert(this.outgoingCount_);

  // Write count
  writer.writeVarInt(this.outgoingCount_);

  // Move all pending commands to the unconfirmed list to use for prediction
  for (var n = 0; n < this.outgoingCount_; n++) {
    var command = this.outgoingArray_[n];

    // Add command to packet
    writer.writeVarInt(command.commandType.typeId);
    command.write(writer);

    // Cleanup command
    if (command instanceof gf.sim.PredictedCommand) {
      // Predicted - it's part of the sequence flow
      // Keep it around so we can re-execute it
      this.unconfirmedPredictedArray_[this.unconfirmedPredictedCount_++] =
          command;
    } else {
      // Unpredicted - just release now, as it doesn't matter
      command.commandType.release(command);
    }
  }

  // Reset lists
  // All pending predicted commands were added to the unconfirmed list above
  this.outgoingCount_ = 0;
  this.outgoingPredictedCount_ = 0;

  // Check to see if we've blocked up
  if (this.unconfirmedPredictedCount_ > 1500) {
    gf.log.write('massive backup of commands, dying');
    // TODO(benvanik): death flag
  }
}