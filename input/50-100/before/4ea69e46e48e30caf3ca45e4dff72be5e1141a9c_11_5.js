function(
    command, opt_excludeUser) {
  // Queue on each observer
  for (var n = 0; n < this.observers_.length; n++) {
    var observer = this.observers_[n];
    if (opt_excludeUser && observer.user == opt_excludeUser) {
      // Skipped due to exclusion
      continue;
    }

    // Queue on observer
    observer.queueOutgoingCommand(command);
  }

  // Queue for release at a later time
  this.cleanupCommandList_.addCommand(command);
}