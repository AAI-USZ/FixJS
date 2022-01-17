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
        KeypadManager.hold_timer = setTimeout(function() {
          KeypadManager.hold_active = true;
        },400);
          }
        }else if (event.type == 'mouseup') {
          if (key == '0') {
            if (KeypadManager.hold_active) {
              KeypadManager.phoneNumber += '+';
            }else {
              KeypadManager.phoneNumber += key;
            }
          }else {
            KeypadManager.phoneNumber += key;
          }
          document.getElementById('phone-number-view').value =
            KeypadManager.phoneNumber;
          KeypadManager.util.moveCaretToEnd(
            document.getElementById('phone-number-view'));
          //We set to default var involved in "Hold event" management
          clearTimeout(KeypadManager.hold_timer);
          KeypadManager.hold_active = false;
        }

      }

  }