function wifiConnect() {
      wifiManager.associate(network);
      gNetworkList.display(network.ssid, _('shortStatus-connecting'));
    }