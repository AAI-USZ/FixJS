function(callback) {
  this.connectedApp();
  this.webServerState = global.states[2];

  // Zeroconf changes
  switch(os.type().toLowerCase()){
    case "linux":
      switch(os.platform().toLowerCase()){
        case "android":
          break;
        case "linux":
          var ad = mdns.createAdvertisement(mdns.tcp('pzp'), global.pzpZeroconfPort);
          ad.start();
          ad.on('error', function(err) {
          log.error("Zeroconf PZP Advertisement error: (" + err+")");
          });
          log.info("started pzp");
          break;
      }
      break;
    case "darwin":
      break;
    case "windows_nt":
      break;
  }
  //end - Zeroconf changes
  if (typeof callback !== "undefined") {
    callback.call(this, "startedPZP", this);
  }
}