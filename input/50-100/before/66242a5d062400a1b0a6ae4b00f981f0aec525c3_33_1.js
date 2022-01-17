function sb_setSettingsListener(settingKey) {
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
      }