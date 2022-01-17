function sm_turnOffFlightMode() {
    var settings = navigator.mozSettings;
    if (settings) {
      settings.getLock().set({'ril.data.enabled': this.reservedSettings.data});
      settings.getLock().set({'bluetooth.enabled': this.reservedSettings.bluetooth});
    }

    // Set wifi as previous
    // XXX: should set mozSettings instead
    var wifiManager = navigator.mozWifiManager;
    if (wifiManager && this.reservedSettings.wifi && !wifiManager.enabled) {
      wifiManager.setEnabled(true);
    }
  }