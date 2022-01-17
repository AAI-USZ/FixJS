function as_show() {
    this.attentionScreen.style.MozTransition = 'none';
    this.attentionScreen.classList.remove('status-mode');

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

      setTimeout(function nextLoop() {
        self.attentionScreen.style.MozTransition = '';
        self.mainScreen.classList.remove('active-statusbar');
        self.dispatchEvent('status-inactive');
      });
    };

    window.addEventListener('MozAfterPaint', function finishAfterPaint() {
      window.removeEventListener('MozAfterPaint', finishAfterPaint);
      finishTransition();
    });
    var securityTimeout = window.setTimeout(finishTransition, 100);
  }