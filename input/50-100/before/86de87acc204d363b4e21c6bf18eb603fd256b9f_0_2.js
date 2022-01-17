function toggleWifi() {
      if (switching)
        return;
      switching = true;
      var req;
      if (gWifiManager.enabled) {
        // stop wifi
        gNetworkList.clear();
        infoBlock.textContent = '';
        req = gWifiManager.setEnabled(false);
      } else {
        // start wifi
        req = gWifiManager.setEnabled(true);
        req.onerror = function() {
          gNetworkList.autoscan = false;
        };
      }
    }