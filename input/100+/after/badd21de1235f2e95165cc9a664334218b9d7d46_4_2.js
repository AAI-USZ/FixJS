function ch_toggleScreen() {
    CallScreen.screen.classList.remove('animate');
    CallScreen.screen.classList.toggle('prerender');

    var displayed = OnCallHandler._displayed;
    // hardening against the unavailability of MozAfterPaint
    var finished = false;

    var self = this;
    var finishTransition = function ch_finishTransition() {
      if (finished)
        return;

      if (securityTimeout) {
        clearTimeout(securityTimeout);
        securityTimeout = null;
      }

      finished = true;

      window.setTimeout(function cs_transitionNextLoop() {
        CallScreen.screen.classList.add('animate');
        CallScreen.screen.classList.toggle('displayed');
        CallScreen.screen.classList.toggle('prerender');

        CallScreen.screen.addEventListener('transitionend', function trWait() {
          CallScreen.screen.removeEventListener('transitionend', trWait);

          // We did animate the call screen off the viewport
          // now closing the window.
          if (displayed)
            window.close();
        });
      });
    };

    window.addEventListener('MozAfterPaint', function ch_finishAfterPaint() {
      window.removeEventListener('MozAfterPaint', ch_finishAfterPaint);
      finishTransition();
    });
    var securityTimeout = window.setTimeout(finishTransition, 100);

    this._displayed = !this._displayed;
  }