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
        if (!bug766497)
          req.onsuccess = onWifiDisabled;
      } else {
        // start wifi
        req = wifiManager.setEnabled(true);
        gNetworkList.clear(true);
        if (!bug766497)
          req.onsuccess = onWifiEnabled;
        req.onerror = function() {
          alert('boo');
          gNetworkList.autoscan = false;
        };
      }
    }