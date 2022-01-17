function scm_turnScreenOff(instant) {
    if (!this.screenEnabled)
      return false;

    var self = this;
    var screenBrightness = navigator.mozPower.screenBrightness;

    var dim = function scm_dim() {
      if (!self._inTransition)
        return;

      screenBrightness -= 0.02;

      if (screenBrightness < 0.1) {
        setTimeout(function noticeTimeout() {
          if (!self._inTransition)
            return;

          finish();
        }, self._dimNotice);
        return;
      }

      navigator.mozPower.screenBrightness = screenBrightness;
      setTimeout(dim, 10);
    };

    var finish = function scm_finish() {
      self.screenEnabled = false;
      self._inTransition = false;
      self.screen.classList.add('screenoff');
      setTimeout(function realScreenOff() {
        navigator.mozPower.screenEnabled = false;
      }, 20);

      self.fireScreenChangeEvent();
    };

    if (instant) {
      finish();
    } else {
      this._inTransition = true;
      dim();
    }

    return true;
  }