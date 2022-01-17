function ls_init() {
    this.getAllElements();
    this.updateMuteState();

    this.lockIfEnabled(true);

    /* Status changes */
    window.addEventListener('volumechange', this);
    window.addEventListener('screenchange', this);

    /* Notification */
    // XXX: Move to notifications.js
    this.notification.addEventListener('click', this);
    window.addEventListener('mozChromeEvent', this);

    /* Gesture */
    this.areaHandle.addEventListener('mousedown', this);
    this.areaCamera.addEventListener('mousedown', this);
    this.areaUnlock.addEventListener('mousedown', this);

    /* Unlock clean up */
    this.overlay.addEventListener('transitionend', this);

    /* Passcode input pad*/
    this.passcodePad.addEventListener('click', this);

    /* Camera app frame load/unload */
    this.camera.addEventListener('load', this);
    this.camera.addEventListener('unload', this);

    /* switching panels */
    window.addEventListener('keyup', this, true);

    var self = this;

    SettingsListener.observe('lockscreen.enabled', true, function(value) {
      if (typeof value === 'string')
        value = (value == 'true');

      self.setEnabled(value);
    });

    SettingsListener.observe(
      'lockscreen.wallpaper', 'balloon.png', function(value) {
      self.updateBackground(value);
      self.overlay.classList.remove('uninit');
    });


    SettingsListener.observe(
        'lockscreen.passcode-lock.enabled', true, function(value) {
      if (typeof value === 'string')
        value = (value == 'true');

      self.setPassCodeEnabled(value);
    });
  }