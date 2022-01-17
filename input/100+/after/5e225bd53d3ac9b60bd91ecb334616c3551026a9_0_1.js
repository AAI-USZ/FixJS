function() {
  var descriptors       = new Object();
  var connectionsLength = this.connections.length;
  var pollfds_t         = ctypes.ArrayType(NSPR.types.PRPollDesc);
  var pollfds           = new pollfds_t(connectionsLength + 2);

  for (var i=0;i<connectionsLength;i++) {
    pollfds[i].fd        = this.connections[i];
    pollfds[i].in_flags  = NSPR.lib.PR_POLL_READ | NSPR.lib.PR_POLL_EXCEPT | NSPR.lib.PR_POLL_ERR;
    pollfds[i].out_flags = 0;
  }

  pollfds[connectionsLength].fd        = this.wakeup;
  pollfds[connectionsLength].in_flags  = NSPR.lib.PR_POLL_READ;
  pollfds[connectionsLength].out_flags = 0;

  pollfds[connectionsLength + 1].fd        = this.serverSocket.fd;
  pollfds[connectionsLength + 1].in_flags  = NSPR.lib.PR_POLL_READ;
  pollfds[connectionsLength + 1].out_flags = 0;

  descriptors.pollfds           = pollfds;
  descriptors.connectionsLength = connectionsLength;

  return descriptors;
}