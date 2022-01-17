function sb_removeListeners(evt) {
    var battery = window.navigator.mozBattery;
    if (battery) {
      battery.removeEventListener('chargingchange', this);
      battery.removeEventListener('levelchange', this);
      battery.removeEventListener('statuschange', this);
    }

    var conn = window.navigator.mozMobileConnection;
    if (conn && conn.voice) {
      conn.removeEventListener('cardstatechange', this);
      conn.removeEventListener('voicechange', this);
      conn.removeEventListener('datachange', this);
    }

    var wifiManager = window.navigator.mozWifiManager;
    if (wifiManager) {
      wifiManager.onstatuschange =
        wifiManager.connectionInfoUpdate = null;
    }

    clearTimeout(this._clockTimer);

    window.removeEventListener('volumechange', this);
  }