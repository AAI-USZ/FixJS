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
        req.onsuccess = updateState;
      } else {
        // start wifi
        req = wifiManager.setEnabled(true);
        gNetworkList.clear(true);
        req.onsuccess = function() {
          updateState();
          gNetworkList.scan();
        }
      }
    }