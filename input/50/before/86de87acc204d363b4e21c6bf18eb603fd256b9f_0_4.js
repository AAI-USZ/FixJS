function wifiDisconnect() {
      gWifiManager.forget(network);
      gStatus.textContent = '';
    }