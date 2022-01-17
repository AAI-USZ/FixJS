function() {
  if(!this.haEnabled) return false;
  var currentTime = new Date().getTime();
  // Current time
  if((currentTime - this.lastReplicaSetTime) >= this.replicasetStatusCheckInterval
    && !this.haProcessInProgress) {
      this.haProcessInProgress = true;
      this.lastReplicaSetTime = currentTime;
      return true;
  } else {
    return false;
  }
}