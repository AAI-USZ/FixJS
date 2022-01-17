function ut_show(dy) {
    var alreadyShown = this.shown;
    var style = this.overlay.style;
    style.MozTransition = '-moz-transform 0.2s linear';
    style.MozTransform = 'translateY(100%)';
    this.shown = true;
    this.screen.classList.add('utility-tray');

    if (!alreadyShown) {
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent('utilitytrayshow', true, true, null);
      window.dispatchEvent(evt);
    }
  }