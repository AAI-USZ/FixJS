function soundManager_fireVolumeChangeEvent() {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('volumechange',
      /* canBubble */ true, /* cancelable */ false,
      {currentVolume: this.currentVolume / 100});
    window.dispatchEvent(evt);
  }