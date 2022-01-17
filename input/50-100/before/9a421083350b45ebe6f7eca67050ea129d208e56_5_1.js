function updateState() {
      switching = false;
      var currentNetwork = wifiManager.connection.network;
      if (currentNetwork) {
        infoBlock.textContent = _('connected', { ssid: currentNetwork.ssid });
        checkbox.checked = true;
      } else if (wifiManager.enabled) {
        infoBlock.textContent = _('fullStatus-disconnected');
        checkbox.checked = true;
      } else {
        infoBlock.textContent = _('disabled');
        checkbox.checked = false;
      }
    }