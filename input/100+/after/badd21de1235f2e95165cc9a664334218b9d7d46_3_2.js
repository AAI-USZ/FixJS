function hk_keyHandler(event) {

    if (event.target.getAttribute('data-value') != null) {
      var key = event.target.getAttribute('data-value');
    }else if (event.target.parentNode.getAttribute('data-value') != null) {
      var key = event.target.parentNode.getAttribute('data-value');
    }

    if (key != undefined) {
        event.stopPropagation();

    if (event.type == 'mousedown') {
      //Play key sound
      TonePlayer.play(gTonesFrequencies[key]);

      // Manage "Hold action" in "0" key
      if (key == '0') {
        KeypadManager._hold_timer = setTimeout(function() {
          KeypadManager._hold_active = true;
        },400);
          }
        }else if (event.type == 'mouseup') {
          if (key == '0') {
            if (KeypadManager._hold_active) {
              KeypadManager._phoneNumber += '+';
            }else {
              KeypadManager._phoneNumber += key;
            }
          }else {
            KeypadManager._phoneNumber += key;
          }
          KeypadManager.phoneNumberView.value =
            KeypadManager._phoneNumber;
          KeypadManager.moveCaretToEnd(
            KeypadManager.phoneNumberView);
          //We set to default var involved in "Hold event" management
          clearTimeout(KeypadManager._hold_timer);
          KeypadManager._hold_active = false;
        }

      }

  }