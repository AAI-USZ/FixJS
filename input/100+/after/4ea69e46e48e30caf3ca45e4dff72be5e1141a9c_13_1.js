function(
    sequence) {
  var unconfirmedList = this.unconfirmedPredictedArray_;
  var unconfirmedCount = this.unconfirmedPredictedCount_;
  if (!unconfirmedCount) {
    return;
  }

  var lastCommand = unconfirmedList[unconfirmedCount - 1];
  if (lastCommand.sequence <= sequence) {
    // All commands confirmed - release all
    for (var n = 0; n < unconfirmedCount; n++) {
      var command = unconfirmedList[n];
      command.commandType.release(command);
    }
    this.unconfirmedPredictedCount_ = 0;
  } else {
    // Run through until we find a command that hasn't been confirmed
    var killCount = unconfirmedCount;
    for (var n = 0; n < unconfirmedCount; n++) {
      var command = unconfirmedList[n];

      // If we are not yet confirmed, abort
      if (command.sequence > sequence) {
        killCount = n;
        break;
      }

      // Release to pool
      command.commandType.release(command);
    }

    // Remove confirmed commands
    // TODO(benvanik): don't splice here
    unconfirmedList.splice(0, killCount);
    this.unconfirmedPredictedCount_ = unconfirmedList.length;
  }
}