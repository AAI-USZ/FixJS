function(event) {
      if (event.settingValue) {
        gBluetoothPowerStatus.textContent = 'Enabled';
      }
      else {
        gBluetoothPowerStatus.textContent = 'Disabled';
      }
      gBluetoothCheckBox.checked = event.settingValue;
    }