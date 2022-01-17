function bt_EnabledSuccess() {
      var bluetooth = window.navigator.mozBluetooth;
      if (!bluetooth)
        return;

      var enabled = req.result['bluetooth.enabled'];
      bluetooth.setEnabled(enabled);
      document.querySelector('#bluetooth-status input').checked = enabled;
    }