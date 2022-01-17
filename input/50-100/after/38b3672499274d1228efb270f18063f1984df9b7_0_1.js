function bt_EnabledSuccess() {
      var enabled = req.result['bluetooth.enabled'];
      gBluetoothPowerStatus.textContent = (enabled)? 'Enabled':'Disabled';
      gBluetoothCheckBox.checked = enabled;
    }