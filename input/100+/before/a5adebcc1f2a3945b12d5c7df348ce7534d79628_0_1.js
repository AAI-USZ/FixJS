function scm_handleEvent(evt) {
    switch (evt.type) {
      case 'devicelight':
        if (!this._deviceLightEnabled || !this.screenEnabled ||
            this._inTransition)
          return;

        // This is a rather naive but pretty effective heuristic
        var brightness =
          Math.max(Math.min((evt.value / 1100), this._brightness), 0.2);
        navigator.mozPower.screenBrightness = brightness;

        break;

      case 'mozfullscreenchange':
        if (document.mozFullScreen) {
          this.screen.classList.add('fullscreen');
        } else {
          this.screen.classList.remove('fullscreen');
        }
        break;

      // The screenshot module also listens for the SLEEP key and
      // may call preventDefault() on the keyup and keydown events.
      case 'keydown':
        if (evt.keyCode !== evt.DOM_VK_SLEEP && evt.keyCode !== evt.DOM_VK_HOME)
          return;

        if (!evt.defaultPrevented)
          this._turnOffScreenOnKeyup = true;
        if (!this.screenEnabled || this._inTransition) {
          this.turnScreenOn();
          this._turnOffScreenOnKeyup = false;
        }

        break;
      case 'keyup':
        if (this.screenEnabled && this._turnOffScreenOnKeyup &&
            evt.keyCode == evt.DOM_VK_SLEEP && !evt.defaultPrevented)
          this.turnScreenOff(true);

        break;
    }
  }