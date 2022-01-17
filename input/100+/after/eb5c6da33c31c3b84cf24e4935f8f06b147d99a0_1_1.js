function bt_init() {

    SettingsListener.observe('bluetooth.enabled', true, function(value) {
      var bluetooth = window.navigator.mozBluetooth;
      if (!bluetooth) {
        return;
      }
      if (bluetooth.enabled == value) {
        return;
      }
      var req = bluetooth.setEnabled(value);
      req.onerror = function bt_EnabledError() {
        // roll back the setting value to notify the UIs
        // that bluetooth has failed to enable.
        var settings = window.navigator.mozSettings;
        if (settings) {
          settings.getLock().set({
            'bluetooth.enabled': !value
          });
        }
      }
    });
  }