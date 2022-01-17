function sb_updateSignal() {
      var conn = window.navigator.mozMobileConnection;
      if (!conn || !conn.voice)
        return;

      var voice = conn.voice;
      var icon = this.icons.signal;
      var flightModeIcon = this.icons.flightMode;

      if (this.settingValues['ril.radio.disabled']) {
        icon.hidden = true;
        flightModeIcon.hidden = false;
        return;
      }

      icon.hidden = false;
      flightModeIcon.hidden = true;

      icon.dataset.roaming = voice.roaming;
      if (voice.relSignalStrength === 0 && !voice.connected) {
        icon.dataset.level = '-1';
      } else {
        icon.dataset.level = Math.floor(voice.relSignalStrength / 20); // 0-5
      }
    }