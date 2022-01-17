function changeBT() {
    var req = gBluetoothManager.setEnabled(this.checked);

    req.onsuccess = function bt_enabledSuccess() {
      if (gBluetoothManager.enabled) {
        gBluetoothPowerStatus.textContent = 'Enabled';
      } else {
        gBluetoothPowerStatus.textContent = 'Disabled';
      }

      var settings = window.navigator.mozSettings;
      if (settings) {
        settings.getLock().set({
          'bluetooth.enabled': gBluetoothManager.enabled
        });
      }
    };

    req.onerror = function bt_enabledError() {
      gBluetoothPowerStatus.textContent = 'Error';
    };
  }