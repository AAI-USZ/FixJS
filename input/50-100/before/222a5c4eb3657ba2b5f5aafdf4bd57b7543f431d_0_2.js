function updateNetworkState() {
    var currentNetwork = wifiManager.connection.network;
    var networkStatus = wifiManager.connection.status;
    //XXX: we need a 'initial' state
    if (networkStatus === "associated" || networkStatus === "connecting") {
      gWifiInfoBlock.textContent = _('fullStatus-connecting', currentNetwork);
    } else if (networkStatus === "connected") {
      gWifiInfoBlock.textContent = _('fullStatus-connected', currentNetwork);
    } else { 
      gWifiInfoBlock.textContent = _('fullStatus-disconnected');
    }
  }