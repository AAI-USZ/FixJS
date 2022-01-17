function ls_lock(instant) {
    var wasAlreadyLocked = this.locked;
    this.locked = true;
    this.overlay.hidden = false;

    this.switchPanel();

    this.overlay.focus();
    if (instant)
      this.overlay.classList.add('no-transition');
    else
      this.overlay.classList.remove('no-transition');

    this.mainScreen.classList.add('locked');

    screen.mozLockOrientation('portrait-primary');

    this.updateTime();

    if (!wasAlreadyLocked) {
      this.dispatchEvent('lock');
      this.writeSetting(true);
    }
  }