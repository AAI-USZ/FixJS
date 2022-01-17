function qs_updateStatus() {
    //XXX: if use mozSetting instead, remove here and add a observe at init()
    var wifiManager = navigator.mozWifiManager;
    this.wifi.dataset.enabled = !!(wifiManager && wifiManager.enabled);
  }