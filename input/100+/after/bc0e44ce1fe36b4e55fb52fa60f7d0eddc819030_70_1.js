function ls_init() {
    this.getAllElements();

    this.lockIfEnabled(true);

    /* Status changes */
    window.addEventListener('volumechange', this);
    window.addEventListener('screenchange', this);

    /* Notification */
    // XXX: Move to notifications.js
    this.notification.addEventListener('click', this);
    window.addEventListener('mozChromeEvent', this);

    /* Gesture */
    this.area.addEventListener('mousedown', this);
    this.areaHandle.addEventListener('mousedown', this);
    this.areaCamera.addEventListener('mousedown', this);
    this.areaUnlock.addEventListener('mousedown', this);

    /* Unlock clean up */
    this.overlay.addEventListener('transitionend', this);

    /* Passcode input pad*/
    this.passcodePad.addEventListener('click', this);

    /* switching panels */
    window.addEventListener('keyup', this, true);

    /* mobile connection state on lock screen */
    var conn = window.navigator.mozMobileConnection;
    if (conn && conn.voice) {
      conn.addEventListener('voicechange', this);
      this.updateConnState();
    }

    var self = this;
    SettingsListener.observe('lockscreen.enabled', true, function(value) {
      self.setEnabled(value);
    });

    SettingsListener.observe('audio.volume.master', 5, function(volume) {
      self.mute.hidden = !!volume;
    });

    SettingsListener.observe(
      'lockscreen.wallpaper', 'balloon.png', function(value) {
      self.updateBackground(value);
      self.overlay.classList.remove('uninit');
    });

    SettingsListener.observe(
      'lockscreen.passcode-lock.code', '0000', function(value) {
      self.passCode = value;
    });

    SettingsListener.observe(
        'lockscreen.passcode-lock.enabled', false, function(value) {
      self.setPassCodeEnabled(value);
    });
  }