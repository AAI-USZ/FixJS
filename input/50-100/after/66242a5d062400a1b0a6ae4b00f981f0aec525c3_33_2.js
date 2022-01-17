function sb_updateTethering() {
      var icon = this.icons.tethering;
      icon.hidden = !(this.settingValues['tethering.usb.enabled'] ||
                      this.settingValues['tethering.wifi.enabled']);

      icon.dataset.active =
        (this.settingValues['tethering.wifi.connectedClients'] !== 0) ||
        (this.settingValues['tethering.usb.connectedClients'] !== 0);
    }