function soundManager_init() {
    window.addEventListener('keydown', this);
    window.addEventListener('keyup', this);

    var self = this;
    SettingsListener.observe('audio.volume.master', this.currentVolume,
      function soundManager_observe(value) {
        self.currentVolume = value * 10;
    });
  }