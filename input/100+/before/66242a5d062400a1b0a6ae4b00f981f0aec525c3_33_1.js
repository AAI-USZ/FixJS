function sb_init() {
    this.getAllElements();

    window.addEventListener('screenchange', this);
    this.setActive(true);

    var settings = {
      'ril.radio.disabled': ['signal', 'data'],
      'ril.data.enabled': ['data'],
      'wifi.enabled': ['wifi', 'data'],
      'bluetooth.enabled': ['bluetooth'],
      'tethering.usb.enabled': ['tethering'],
      'tethering.wifi.enabled': ['tethering'],
      'tethering.wifi.stations.clients': ['tethering'],
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
      })(settingKey);
    }
  }