function updateState() {
      switching = false;
      var currentNetwork = gWifiManager.connection.network;
      if (currentNetwork) {
        infoBlock.textContent = _('fullStatus-connected', currentNetwork);
        checkbox.checked = true;
      } else if (gWifiManager.enabled) {
        infoBlock.textContent = _('fullStatus-disconnected');
        checkbox.checked = true;
      } else {
        infoBlock.textContent = _('disabled');
        checkbox.checked = false;
      }
    }