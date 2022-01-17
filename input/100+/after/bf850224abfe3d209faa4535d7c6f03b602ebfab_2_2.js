function sm_turnOnFlightMode() {
    var settings = navigator.mozSettings;
    var self = this;
    if (settings) {
      // Turn off data
      var reqData = settings.getLock().get('ril.data.enabled');
      reqData.onsuccess = function sm_EnabledFetched() {
        self.reservedSettings.data = reqData.result['ril.data.enabled'];
        settings.getLock().set({'ril.data.enabled': false});
      };
      // Turn off bluetooth
      var reqBt = settings.getLock().get('bluetooth.enabled');
      reqBt.onsuccess = function bt_EnabledSuccess() {
        self.reservedSettings.bluetooth = reqBt.result['bluetooth.enabled'];
        settings.getLock().set({'bluetooth.enabled': false});
      };
      // Turn off wifi
      var reqWifi = settings.getLock().get('wifi.enabled');
      reqWifi.onsuccess = function wf_EnabledSuccess() {
        self.reservedSettings.wifi = reqWifi.result['wifi.enabled'];
        settings.getLock().set({'wifi.enabled': false});
      };
    }
  }