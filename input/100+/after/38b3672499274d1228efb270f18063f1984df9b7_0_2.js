function bluetoothSettings(evt) {
  var gBluetoothPowerStatus = document.querySelector('#bluetooth-status small');
  var gBluetoothCheckBox = document.querySelector('#bluetooth-status input');

  var settings = window.navigator.mozSettings;
  if (settings) {
    settings.addObserver('bluetooth.enabled', function(event) {
      gBluetoothPowerStatus.textContent = (event.settingValue)? 'Enabled':'Disabled';
      gBluetoothCheckBox.checked = event.settingValue;
    });

    var req = settings.getLock().get('bluetooth.enabled');
    req.onsuccess = function bt_EnabledSuccess() {
      var enabled = req.result['bluetooth.enabled'];
      gBluetoothPowerStatus.textContent = (enabled)? 'Enabled':'Disabled';
      gBluetoothCheckBox.checked = enabled;
    };

    req.onerror = function bt_EnabledError() {
      console.log('Settings error when reading bluetooth setting!');
    };

  }

  function changeBT() {
    if (settings) {
      settings.getLock().set({
        'bluetooth.enabled': this.checked
      });
    }
  };

  document.querySelector('#bluetooth-status input').onchange = changeBT;
}