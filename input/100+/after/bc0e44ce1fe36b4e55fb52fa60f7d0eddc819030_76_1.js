function sb_updateSignal() {
      var conn = window.navigator.mozMobileConnection;
      if (!conn || !conn.voice)
        return;

      var voice = conn.voice;
      var icon = this.icons.signal;
      var flightModeIcon = this.icons.flightMode;
      var connLabel = this.icons.conn;
      var _ = navigator.mozL10n.get;

      if (this.settingValues['ril.radio.disabled']) {
        icon.hidden = true;
        connLabel.hidden = true;
        flightModeIcon.hidden = false;
        return;
      }

      flightModeIcon.hidden = true;

      icon.dataset.roaming = voice.roaming;
      if (!voice.connected && !voice.emergencyCallsOnly) {
        icon.hidden = true;
        connLabel.hidden = false;
        connLabel.dataset.l10nId = 'searching';
        connLabel.textContent = _('searching') || '';
      } else {
        icon.hidden = false;
        connLabel.hidden = true;
        icon.dataset.level = Math.floor(voice.relSignalStrength / 20); // 0-5
      }
    }