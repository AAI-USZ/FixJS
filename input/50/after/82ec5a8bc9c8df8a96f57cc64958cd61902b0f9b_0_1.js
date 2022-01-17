function () {
  // silence further transport errors and prevent uncaught exceptions
  this.transport.on('error', function(){
    debug('error triggered by discarded transport');
  });
  clearTimeout(this.pingIntervalTimer);
  clearTimeout(this.pingTimeoutTimer);
}