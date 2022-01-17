function onWifiEnabled() {
    updateNetworkState(); // update wifi state
    gNetworkList.scan();
  }