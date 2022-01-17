function bt_EnabledSuccess() {
      var enabled = req.result['bluetooth.enabled'];
      if (enabled) {
        gBluetoothPowerStatus.textContent = 'Enabled';
      }
      else {
        gBluetoothPowerStatus.textContent = 'Disabled';
      }
      gBluetoothCheckBox.checked = enabled;
    }