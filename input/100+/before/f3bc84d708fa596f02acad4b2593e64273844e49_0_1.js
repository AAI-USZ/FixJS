function(callback) {
  if (typeof callback !== "undefined") {
    callback.call(this, "startedPZP", this);
  }
  this.connectedApp();
  this.webServerState = global.states[2];
  var ad = mdns.createAdvertisement(mdns.tcp('pzp'), global.pzpZeroconfPort);
  ad.start();
  
  ad.on('error', function(err) {
   log.error("Zeroconf PZP Advertisement error: (" + err+")");
  });
  
  log.info("started pzp");                      
}