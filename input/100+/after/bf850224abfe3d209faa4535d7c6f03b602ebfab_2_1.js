function sm_turnOffFlightMode() {
    var settings = navigator.mozSettings;
    if (settings) {
      if (this.reservedSettings.data) {
        settings.getLock().set({'ril.data.enabled': true});
      }
      if (this.reservedSettings.bluetooth) {
        settings.getLock().set({'bluetooth.enabled': true});
      }
      if (this.reservedSettings.wifi) {
        settings.getLock().set({'wifi.enabled': true});
      }
    }
  }