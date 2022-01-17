function sm_turnOnFlightMode() {
    var settings = navigator.mozSettings;
    var self = this;
    if (settings) {
      // Turn off data
      var req = settings.getLock().get('ril.data.enabled');
      req.onsuccess = function sm_EnabledFetched() {
        self.reservedSettings.data = req.result['ril.data.enabled'];
        settings.getLock().set({'ril.data.enabled': false});
      };
      // Turn off blueTooth
      var req = settings.getLock().get('bluetooth.enabled');
      req.onsuccess = function bt_EnabledSuccess() {
        self.reservedSettings.bluetooth = req.result['bluetooth.enabled'];
        settings.getLock().set({'bluetooth.enabled': false});
      };
    }

    // Turn off wifi
    // XXX: should set mozSettings instead
    var wifiManager = navigator.mozWifiManager;
    if (wifiManager) {
      this.reservedSettings.wifi = wifiManager.enabled;
      wifiManager.setEnabled(false);
    }

  }