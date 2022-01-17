function lockscreen_checkPassCode() {
    if (this.passCodeEntered === this.smileyCode)
      this.overlay.classList.add('smiley');

    if (this.passCodeEntered === this.passCode) {
      this.overlay.dataset.passcodeStatus = 'success';
      this.passCodeError = 0;

      this.unlock();
    } else {
      this.overlay.dataset.passcodeStatus = 'error';
      if ('vibrate' in navigator)
        navigator.vibrate([50, 50, 50]);

      var timeout = this.kPassCodeErrorTimeout;
      this.passCodeError++;
      if (this.passCodeError >= 3)
        timeout = this.kPassCodeTriesTimeout;

      var self = this;
      setTimeout(function error() {
        delete self.overlay.dataset.passcodeStatus;
        self.passCodeEntered = '';
        self.updatePassCodeUI();
      }, timeout);
    }
  }