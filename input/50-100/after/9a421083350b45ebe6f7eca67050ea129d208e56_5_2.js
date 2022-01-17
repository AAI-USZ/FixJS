function toggleWifi() {
      if (switching)
        return;
      switching = true;
      var req;
      if (wifiManager.enabled) {
        // stop wifi
        gNetworkList.clear();
        infoBlock.textContent = '';
        req = wifiManager.setEnabled(false);
      } else {
        // start wifi
        req = wifiManager.setEnabled(true);
        req.onerror = function() {
          gNetworkList.autoscan = false;
        };
      }
    }