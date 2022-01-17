function och_syncSpeakerEnabled() {
    if (navigator.mozTelephony.speakerEnabled) {
      this.speakerButton.classList.add('speak');
    } else {
      this.speakerButton.classList.remove('speak');
    }
  }