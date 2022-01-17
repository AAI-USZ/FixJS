function (callback) {
  var that = this;
  dnsServer = ndns.createServer('udp4');
  log('Starting process ' + process.pid);
  dnsServer.on("request", mainListener);
  dnsServer.on("listening", function () {
    log('Olodum listening on port 53');
    log('Olodum forwarding domains ' + domains.join(', ') + ' to ' + target);
    that.started = true;
  });
  dnsServer.bind(53);
  env.setLocal();

  //unregister local DNS server on exit else just trap exception
  process.stdin.resume();

  process.on('SIGINT', this.stop);
  process.on('SIGTERM', this.stop);

  if (typeof callback === 'function') callback();
}