function as_open(evt) {
    if (evt.detail.features != 'attention')
      return;

    // preventDefault means "we're handling this popup; let it through."
    evt.preventDefault();

    var attentionFrame = evt.detail.frameElement;
    attentionFrame.setAttribute('mozbrowser', 'true');
    attentionFrame.setAttribute('mozapp', evt.target.getAttribute('mozapp'));
    attentionFrame.dataset.frameType = 'attention';
    attentionFrame.dataset.frameName = evt.detail.name;
    attentionFrame.dataset.frameOrigin = evt.target.dataset.frameOrigin;
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
  }