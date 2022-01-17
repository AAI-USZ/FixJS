function(event) {
    // update network status only if wifi is enabled.
    if (gWifiManager.enabled) {
      updateNetworkState();

      // refresh the network list when network is connected.
      if (event.status == 'connected') {
        gNetworkList.scan();
      }
    }
  }