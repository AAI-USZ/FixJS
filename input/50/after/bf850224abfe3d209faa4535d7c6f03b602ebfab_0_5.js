function wifiDisconnect() {
      wifiManager.forget(network);
      gNetworkList.display(network.ssid, _('shortStatus-disconnected'));
    }