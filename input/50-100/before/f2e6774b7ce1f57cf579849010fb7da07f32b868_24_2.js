function ch_toggleSpeaker() {
    this.speakerButton.classList.toggle('speak');
    navigator.mozTelephony.speakerEnabled =
      !navigator.mozTelephony.speakerEnabled;
  }