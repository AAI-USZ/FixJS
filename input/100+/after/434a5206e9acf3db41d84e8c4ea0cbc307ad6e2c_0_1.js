function kh_keyHandler(event) {
    if (event.target.dataset.value != null) {
      var key = event.target.dataset.value;
    } else if (event.target.parentNode.dataset.value != null) {
      var key = event.target.parentNode.dataset.value;
    }

    if (key != undefined) {
      event.stopPropagation();

      if (event.type == 'mousedown') {
        if (key != 'delete') {
          if (keypadSoundIsEnabled) {
            TonePlayer.play(gTonesFrequencies[key]);
          }

          // Sending the DTMF tone
          var telephony = navigator.mozTelephony;
          if (telephony) {
            if ((telephony.active != null) 
                 && (telephony.active.state == 'connected')) {
              telephony.startTone(key);
              window.setTimeout(function ch_stopTone() {
                telephony.stopTone();
              }, 100);
            }
          }
        }

        // Manage long press
        if (key == '0' || key == 'delete') {
          this._holdTimer = setTimeout(function(self) {
            if (key == 'delete') {
              self._phoneNumber = '';
            } else {
              self._phoneNumber += '+';
            }

            self._longPress = true;
            self._updatePhoneNumberView();
          }, 400, this);
        }
      } else if (event.type == 'mouseup') {
        // If it was a long press our work is already done
        if (this._longPress) {
          this._longPress = false;
          this._holdTimer = null;
          return;
        }
        if (key == 'delete') {
          this._phoneNumber = this._phoneNumber.slice(0, -1);
        } else {
          this._phoneNumber += key;
        }

        if (this._holdTimer)
          clearTimeout(this._holdTimer);

        this._updatePhoneNumberView();
      }
    }
  }