function sb_updateTethering() {
      var icon = this.icons.tethering;
      icon.hidden = !(this.settingValues['tethering.usb.enabled'] ||
                      this.settingValues['tethering.wifi.enabled']);

      // XXX no way to probe active state from USB tethering for now
      // 'tethering.usb.active'??

      icon.dataset.active =
        (this.settingValues['tethering.wifi.stations.clients'] !== 0);
    }