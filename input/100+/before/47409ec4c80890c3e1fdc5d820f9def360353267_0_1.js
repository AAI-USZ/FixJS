function sb_init() {
    this.getAllElements();

    var settings = {
      'ril.radio.disabled': ['signal', 'data'],
      'ril.data.enabled': ['data'],
      'wifi.enabled': ['wifi', 'data'],
      'bluetooth.enabled': ['bluetooth'],
      'tethering.usb.enabled': ['tethering'],
      'tethering.wifi.enabled': ['tethering'],
      'tethering.wifi.connectedClients': ['tethering'],
      'tethering.usb.connectedClients': ['tethering'],
      'audio.volume.master': ['mute'],
      'alarm.enabled': ['alarm']
    };

    var self = this;
    for (var settingKey in settings) {
      (function sb_setSettingsListener(settingKey) {
        SettingsListener.observe(settingKey, false,
          function sb_settingUpdate(value) {
            self.settingValues[settingKey] = value;
            settings[settingKey].forEach(
              function sb_callUpdate(name) {
                self.update[name].call(self);
              }
            );
          }
        );
        self.settingValues[settingKey] = false;
      })(settingKey);
    }

    window.addEventListener('screenchange', this);
    this.setActive(true);
  }