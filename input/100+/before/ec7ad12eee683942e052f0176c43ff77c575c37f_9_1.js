function as_open(evt) {
    if (evt.detail.features != 'attention')
      return;

    // stopPropagation means we are not allowing
    // Popup Manager to handle this event
    evt.stopPropagation();

    var attentionFrame = evt.detail.frameElement;
    attentionFrame.setAttribute('mozapp', evt.target.getAttribute('mozapp'));
    attentionFrame.dataset.frameType = 'attention';
    attentionFrame.dataset.frameName = evt.detail.name;
    attentionFrame.dataset.frameOrigin = evt.target.dataset.frameOrigin;

    // FIXME: won't be needed once
    // https://bugzilla.mozilla.org/show_bug.cgi?id=769182 is fixed
    attentionFrame.src = evt.detail.url;

    this.screen.appendChild(attentionFrame);
    this.screen.classList.add('displayed');

    // XXX: before probing ScreenManager.screenEnabled,
    // sync it's value with mozPower
    ScreenManager._syncScreenEnabledValue();

    // We want the user attention, so we need to turn the screen on
    // if it's off.
    this._screenInitiallyDisabled = !ScreenManager.screenEnabled;
    if (this._screenInitiallyDisabled)
      ScreenManager.turnScreenOn();

    // Ensuring the proper mozvisibility changed on the displayed app
    var displayedOrigin = WindowManager.getDisplayedApp();
    if (displayedOrigin) {
      var frame = WindowManager.getAppFrame(displayedOrigin);
      if ('setVisible' in frame) {
        frame.setVisible(false);
      }
    }
  }