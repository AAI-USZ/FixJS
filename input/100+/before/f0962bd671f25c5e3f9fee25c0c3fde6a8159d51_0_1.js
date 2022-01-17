function as_close(evt) {
    if (!'frameType' in evt.target.dataset ||
        evt.target.dataset.frameType !== 'attention')
      return;

    this.screen.classList.remove('displayed');
    this.screen.classList.remove('status');
    this.screen.removeChild(evt.target);

    if (this._screenInitiallyDisabled)
      ScreenManager.turnScreenOff();

    // We just removed the focused window leaving the system
    // without any focused window, let's fix this.
    window.focus();

    // Ensuring the proper mozvisibility changed on the displayed app
    var displayedOrigin = WindowManager.getDisplayedApp();
    if (displayedOrigin) {
      var frame = WindowManager.getAppFrame(displayedOrigin);
      if ('setVisible' in frame) {
        frame.setVisible(true);
      }
    }
  }