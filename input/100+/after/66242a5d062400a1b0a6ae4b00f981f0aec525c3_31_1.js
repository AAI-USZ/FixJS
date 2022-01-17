function as_show() {
    this.attentionScreen.style.MozTransition = 'none';
    this.attentionScreen.classList.remove('status-mode');

    var self = this;
    window.addEventListener('MozAfterPaint', function finishAfterPaint() {
      window.removeEventListener('MozAfterPaint', finishAfterPaint);
      setTimeout(function nextLoop() {
        self.attentionScreen.style.MozTransition = '';
        self.mainScreen.classList.remove('active-statusbar');
        self.dispatchEvent('status-inactive');
      });
    });
  }