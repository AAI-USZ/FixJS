function wifiConnect() {
      gWifiManager.associate(network);
      gNetworkList.display(network.ssid, _('shortStatus-connecting'));
    }