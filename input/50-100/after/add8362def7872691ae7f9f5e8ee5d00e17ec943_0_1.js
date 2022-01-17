function() {
  if(!this.haEnabled) return false;
  var currentTime = new Date().getTime();
  if((currentTime - this.lastReplicaSetTime) >= this.replicasetStatusCheckInterval) {
    this.lastReplicaSetTime = currentTime;
    return true;
  } else {
    return false;
  }
}