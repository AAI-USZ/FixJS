function wifiConnect() {
      wifiManager.associate(network);
      gStatus.textContent = '';
      gNetworkList.display(network.ssid, _('shortStatus-disconnected'));
    }