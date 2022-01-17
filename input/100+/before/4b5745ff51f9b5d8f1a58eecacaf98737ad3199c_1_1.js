function wf_init() {

    SettingsListener.observe('wifi.enabled', true, function(value) {
      var wifiManager = window.navigator.mozWifiManager;
      if (!wifiManager) {
        return;
      }
      if (wifiManager.enabled == value) {
        return;
      }
      var req = wifiManager.setEnabled(value);
      req.onerror = function wf_EnabledError() {
        // roll back the setting value to notify the UIs
        // that wifi has failed to enable/disable.
        // XXX: what if a series of failure?
        var settings = window.navigator.mozSettings;
        if (settings) {
          settings.getLock().set({
            'wifi.enabled': !value
          });
        }
      }
    });

    //XXX: these code should be removed
    // when WifiManager read 'wifi.enabled' from DB
    var settings = window.navigator.mozSettings;
    if (settings) {
      var wifiManager = window.navigator.mozWifiManager;
      if (!wifiManager) {
        return;
      }
      settings.getLock().set({'wifi.enabled': true});
    }
  }