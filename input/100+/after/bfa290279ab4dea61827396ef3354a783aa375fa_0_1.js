function scm_init() {
    /* Allow others to cancel the keyup event but not the keydown event */
    window.addEventListener('keydown', this, true);
    window.addEventListener('keyup', this);

    this.screen = document.getElementById('screen');
    this.screen.classList.remove('screenoff');

    var self = this;
    var power = navigator.mozPower;

    power.addWakeLockListener(function scm_handleWakeLock(topic, state) {
      switch (topic) {
        case 'screen':
          self._screenWakeLocked = (state == 'locked-foreground');

          if (self._screenWakeLocked) {
            // Turn screen on if wake lock is acquire
            self.turnScreenOn();
          } else if (self._idled) {
            // Turn screen off if we are already idled
            // and wake lock is released
            self.turnScreenOff(false);
          }
          break;

        case 'cpu':
          power.cpuSleepAllowed = (state != 'locked-foreground' &&
                                   state != 'locked-background');
          break;

        case 'wifi':
          // Do we need to do anything in Gaia?
          break;
      }
    });

    // When idled, trigger the idle-screen-off process
    this.idleObserver.onidle = function scm_onidle() {
      self._idled = true;
      if (!self._screenWakeLocked)
        self.turnScreenOff(false);
    };

    // When active, cancel the idle-screen-off process
    this.idleObserver.onactive = function scm_onactive() {
      self._idled = false;
      if (self._inTransition) {
        self._inTransition = false;
        navigator.mozPower.screenBrightness = self._brightness;
      }
    };

    SettingsListener.observe('screen.timeout', 60,
    function screenTimeoutChanged(value) {
      self.setIdleTimeout(value);
    });

    SettingsListener.observe('screen.automatic-brightness', true,
    function deviceLightSettingChanged(value) {
      if (typeof value === 'string')
        value = (value == 'true');

      self.setDeviceLightEnabled(value);
    });

    SettingsListener.observe('screen.brightness', 1,
    function brightnessSettingChanged(value) {
      if (typeof value === 'string')
        value = parseFloat(value);

      self.setBrightness(value);
    });

    self.turnScreenOn();
  }