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

  process.stdin.resume();

  //unregister local DNS server on exit else just trap exception
  process.on('SIGINT', this.stop);
  process.on('SIGTERM', this.stop);
  process.on('uncaughtException', function (err) {log(err.toString());that.stop()});

  //change local entries for DNS servers
  env.setLocal();
  if (typeof callback === 'function') callback();
}