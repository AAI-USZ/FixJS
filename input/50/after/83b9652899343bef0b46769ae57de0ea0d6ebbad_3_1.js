function fireVolumeChangeEvent() {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('volumechange',
      /* canBubble */ true, /* cancelable */ false,
      { currentVolume: currentVolume });
    window.dispatchEvent(evt);
  }