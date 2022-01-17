function sb_updateWifi(evt) {
    var wifiManager = window.navigator.mozWifiManager;
    if (!wifiManager)
      return;
    var network = wifiManager.connection.network;

    // We'll hide the data status icon here since all traffic is
    // going through Wifi when it's connected
    this.wifi.hidden = !network;
    this.data.hidden = !!network;

    if (network && evt.relSignalStrength) {
      // relSignalStrength should be between 0 and 100
      var relSignalStrength = evt.relSignalStrength || 0;
      if (wifiManager.connectionInformation) {
        relSignalStrength =
          wifiManager.connectionInformation.relSignalStrength;
      }

      var level = Math.min(Math.floor(relSignalStrength / 20), 4);
      this.wifi.className = 'signal-level' + level;
    }
  }