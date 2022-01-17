function ls_updateConnState() {
    var voice = window.navigator.mozMobileConnection.voice;
    var _ = navigator.mozL10n.get;

    if (voice.emergencyCallsOnly) {
      this.connstate.hidden = false;
      this.connstate.dataset.l10nId = 'emergencyCallsOnly';
      this.connstate.textContent = _('emergencyCallsOnly') || '';

      return;
    }

    if (!voice.connected) {
      this.connstate.hidden = true;

      return;
    }

    this.connstate.hidden = false;
    delete this.connstate.dataset.l10nId;
    this.connstate.textContent = voice.network.shortName;
  }