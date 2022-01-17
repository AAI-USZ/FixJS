function onWifiEnabled() {
    console.log('===== wifiManager enabled');
    updateNetworkState(); // update wifi state
    gNetworkList.scan();
  }