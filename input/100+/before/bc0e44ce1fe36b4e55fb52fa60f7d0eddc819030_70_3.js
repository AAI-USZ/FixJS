function ls_updateMuteState() {
    SettingsListener.observe('audio.volume.master', 5, (function(volume) {
      this.mute.hidden = volume;
    }).bind(this));
  }