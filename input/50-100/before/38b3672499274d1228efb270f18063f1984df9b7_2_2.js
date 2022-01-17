function qs_updateStatus() {
    var wifiManager = navigator.mozWifiManager;
    this.wifi.dataset.enabled = !!(wifiManager && wifiManager.enabled);

    var bluetooth = navigator.mozBluetooth;
    this.bluetooth.dataset.enabled = !!(bluetooth && bluetooth.enabled);
  }