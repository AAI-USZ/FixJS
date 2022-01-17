function ut_show(dy) {
    var alreadyShown = this.shown;
    var trayStyle = this.overlay.style;
    var firstShownStyle = this.firstShown.style;

    trayStyle.MozTransition = '-moz-transform 0.2s linear';
    trayStyle.MozTransform = 'translateY(100%)';

    firstShownStyle.MozTransition = '-moz-transform 0.2s linear';
    firstShownStyle.MozTransform = 'translateY(0px)';

    this.shown = true;
    this.screen.classList.add('utility-tray');

    if (!alreadyShown) {
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent('utilitytrayshow', true, true, null);
      window.dispatchEvent(evt);
    }
  }