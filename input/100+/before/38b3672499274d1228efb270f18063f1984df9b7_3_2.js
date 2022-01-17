function sm_turnOnFlightMode() {
    var settings = navigator.mozSettings;
    var self = this;
    if (settings) {
      var req = settings.getLock().get('ril.data.disabled');
      req.onsuccess = function sm_EnabledFetched() {
        self.reservedSettings.data = req.result['ril.data.disabled'];
        settings.getLock().set({'ril.data.disabled': true});
      };
    }

    var wifiManager = navigator.mozWifiManager;
    if (wifiManager) {
      this.reservedSettings.wifi = wifiManager.enabled;
      wifiManager.setEnabled(false);
    }

    var bluetooth = navigator.mozBluetooth;
    if (bluetooth) {
      this.reservedSettings.bluetooth = bluetooth.enabled;
      bluetooth.setEnabled(false);
    }
  }