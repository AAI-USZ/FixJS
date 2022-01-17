function(event) {
      gBluetoothPowerStatus.textContent = (event.settingValue)? 'Enabled':'Disabled';
      gBluetoothCheckBox.checked = event.settingValue;
    }