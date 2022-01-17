function sb_addListeners() {
    var battery = window.navigator.battery;
    if (battery) {
      battery.addEventListener('chargingchange', this);
      battery.addEventListener('levelchange', this);
      battery.addEventListener('statuschange', this);
    }

    var conn = window.navigator.mozMobileConnection;
    if (conn && conn.voice) {
      conn.addEventListener('cardstatechange', this);
      conn.addEventListener('voicechange', this);
      conn.addEventListener('datachange', this);
    }

    var wifiManager = window.navigator.mozWifiManager;
    if (wifiManager) {
      wifiManager.onstatuschange =
        wifiManager.connectionInfoUpdate = (this.updateWifi).bind(this);
    }

    window.addEventListener('volumechange', this);
  }