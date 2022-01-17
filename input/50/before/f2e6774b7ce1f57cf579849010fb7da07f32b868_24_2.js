function ch_toggleMute() {
    this.muteButton.classList.toggle('mute');
    navigator.mozTelephony.muted = !navigator.mozTelephony.muted;
  }