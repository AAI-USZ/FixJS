function sb_updateConnection() {
    var conn = window.navigator.mozMobileConnection;
    if (!conn || !conn.voice)
      return;

    var _ = navigator.mozL10n.get;
    /* Information about voice connection */
    var voice = conn.voice;
    /* Information about data connection */
    var data = conn.data;

    if (this.radioDisabled) {
      this.conn.textContent = _('airplane');
      this.comm.dataset.l10nId = 'airplane';
      this.signal.hidden = true;
      this.data.textContent = '';
      return;
    }
    this.signal.hidden = false;

    // Update the operator name / SIM status.
    var titleL10nId = '';
    var title = '';
    switch (conn.cardState) {
      case 'absent':
        titleL10nId = 'noSimCard';
        break;
      case 'pin_required':
        titleL10nId = 'pinCodeRequired';
        break;
      case 'puk_required':
        titleL10nId = 'pukCodeRequired';
        break;
      case 'network_locked':
        titleL10nId = 'networkLocked';
        break;
    }

    if (!titleL10nId) {
      if (!voice.connected) {
        if (voice.emergencyCallsOnly) {
          titleL10nId = 'emergencyCallsOnly';
        } else {
          titleL10nId = 'searching';
        }
      } else {
        // voice.network will be introduced by bug 761482
        // Before that, get operator name from voice.operator.
        title = (voice.network) ?
          voice.network.shortName : voice.operator;

        if (voice.roaming) {
          this.signal.classList.add('roaming');
        } else {
          this.signal.classList.remove('roaming');
        }
      }
    }

    if (title) {
      this.conn.textContent = title;
      delete this.conn.dataset.l10nId;
    } else if (titleL10nId) {
      this.conn.textContent = _(titleL10nId) || '';
      this.conn.dataset.l10nId = titleL10nId;
    } else {
      this.conn.textContent = '';
      delete this.conn.dataset.l10nId;
    }

    // Update the 3G/data status.
    // XXX: need icon for 3G/EDGE/etc instead of expose the type text
    if (data) {
      this.data.textContent =
        data.connected ? data.type.toUpperCase() : '';
    } else {
      this.data.textContent = '';
    }

    // Update the signal strength bars.
    var signalElements = this.signal.children;
    for (var i = 0; i < 4; i++) {
      var haveSignal = (i < voice.relSignalStrength / 25);
      var el = signalElements[i];
      if (haveSignal) {
        el.classList.add('have-signal');
      } else {
        el.classList.remove('have-signal');
      }
    }
  }