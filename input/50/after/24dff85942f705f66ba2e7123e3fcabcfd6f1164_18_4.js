function wifiDisconnect() {
      gWifiManager.forget(network);
      gNetworkList.display(network.ssid, _('shortStatus-disconnected'));
    }