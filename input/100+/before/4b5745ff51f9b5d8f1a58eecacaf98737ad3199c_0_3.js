function updateNetworkState() {
    var currentNetwork = gWifiManager.connection.network;
    var networkStatus = gWifiManager.connection.status;
    //XXX: we need a 'initial' state
    if (!gWifiManager.enabled) {
        gWifiInfoBlock.textContent = _('fullStatus-connecting', currentNetwork);
    } else {
      console.log('===== network status: ' + networkStatus);
      if (networkStatus === 'associated' || networkStatus === 'connecting') {
        gWifiInfoBlock.textContent = _('fullStatus-connecting', currentNetwork);
      } else if (networkStatus === 'connected') {
        gWifiInfoBlock.textContent = _('fullStatus-connected', currentNetwork);
      } else {
        gWifiInfoBlock.textContent = _('fullStatus-disconnected');
      }
    }
  }