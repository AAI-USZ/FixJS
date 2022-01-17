function() {
  var pollfds_t = ctypes.ArrayType(NSPR.types.PRPollDesc);
  var pollfds   = new pollfds_t(this.connections.length + 2);

  for (var i in this.connections) {
    pollfds[i].fd        = this.connections[i];
    pollfds[i].in_flags  = NSPR.lib.PR_POLL_READ | NSPR.lib.PR_POLL_EXCEPT | NSPR.lib.PR_POLL_ERR;
    pollfds[i].out_flags = 0;
  }

  pollfds[this.connections.length].fd        = this.wakeup;
  pollfds[this.connections.length].in_flags  = NSPR.lib.PR_POLL_READ;
  pollfds[this.connections.length].out_flags = 0;

  pollfds[this.connections.length + 1].fd        = this.serverSocket.fd;
  pollfds[this.connections.length + 1].in_flags  = NSPR.lib.PR_POLL_READ;
  pollfds[this.connections.length + 1].out_flags = 0;

  return pollfds;
}