function ls_updateMuteState() {
    this.mute.hidden = !!SoundManager.currentVolume;
  }