function(clientIndex, serverIndex) {
  NSPR.lib.PR_Close(this.connections[clientIndex]);
  NSPR.lib.PR_Close(this.connections[serverIndex]);

  this.connections.splice(clientIndex, 2);
}