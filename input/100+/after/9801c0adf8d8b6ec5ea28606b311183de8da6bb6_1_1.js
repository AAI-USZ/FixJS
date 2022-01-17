function kh_keyDown(event) {
    var key = event.target.getAttribute('data-value');
    if (!key)
      return;

    var callback = function(self) {
      switch (key) {
        case '0':
          self.phoneNumber.value = self.phoneNumber.value.slice(0, -1) + '+';
          break;
        case '*':
          self.phoneNumber.value = self.phoneNumber.value.slice(0, -1) + '#';
          break;
        case 'del-digit':
          self.phoneNumber.value = '';
          break;
        default:
          if (self.isContactShortcut(key))
            return;
          break;
      }
      self.updateFontSize();
    };

    if (key == 'del-digit') {
      this.phoneNumber.value = KeyHandler.phoneNumber.value.slice(0, -1);
      this.updateFontSize();
    } else if (key == 'make-call') {
      // TODO: update the call button style to show his availability
      if (this.phoneNumber.value != '') {
        CallHandler.call(this.phoneNumber.value);
      }
    } else {
      if (this.phoneNumber) {
        this.phoneNumber.value += key;
        this.updateFontSize();
      }

      if (keypadSoundIsEnabled) {
        TonePlayer.play(gTonesFrequencies[key]);
      }

      // Sending the DTMF tone
      var telephony = navigator.mozTelephony;
      if (telephony) {
        telephony.startTone(key);
        window.setTimeout(function ch_stopTone() {
          telephony.stopTone();
        }, 100);
      }
    }

    this._timeout = window.setTimeout(callback, 400, this);
  }