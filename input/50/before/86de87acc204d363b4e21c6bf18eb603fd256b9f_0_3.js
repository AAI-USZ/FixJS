function wifiConnect() {
      gWifiManager.associate(network);
      gStatus.textContent = '';
      gNetworkList.display(network.ssid, _('shortStatus-connecting'));
    }