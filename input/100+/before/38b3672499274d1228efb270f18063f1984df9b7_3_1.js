function sm_turnOffFlightMode() {
    var settings = navigator.mozSettings;
    if (settings && this.reservedSettings.data) {
      settings.getLock().set({'ril.data.disabled': this.reservedSettings.data});
    }

    var wifiManager = navigator.mozWifiManager;
    if (wifiManager && this.reservedSettings.wifi && !wifiManager.enabled) {
      wifiManager.setEnabled(true);
    }

    var bluetooth = navigator.mozBluetooth;
    if (bluetooth && this.reservedSettings.bluetooth && !bluetooth.enabled) {
      bluetooth.setEnabled(true);
    }
  }