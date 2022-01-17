function sb_updateWifi(evt) {
      var wifiManager = window.navigator.mozWifiManager;
      if (!wifiManager)
        return;

      var icon = this.icons.wifi;

      if (!this.settingValues['wifi.enabled']) {
        icon.hidden = true;

        return;
      }

      var network = wifiManager.connection.network;
      this.wifiConnected = !!network;

      if (!this.wifiConnected) {
        icon.hidden = true;
        this.update.data.call(this);

        return;
      }

      icon.hidden = false;
      var relSignalStrength = 0;
      if (evt && evt.relSignalStrength) {
        relSignalStrength = evt.relSignalStrength;
      } else if (wifiManager.connectionInformation &&
                 wifiManager.connectionInformation.relSignalStrength) {
        relSignalStrength =
          wifiManager.connectionInformation.relSignalStrength;
      } else {
        console.error(
          'Status Bar: WIFI is connected but signal strength is unknown.');
      }

      icon.dataset.level = Math.floor(relSignalStrength / 25);
    }