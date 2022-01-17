function ut_init() {
    var touchEvents = ['touchstart', 'touchmove', 'touchend'];

    // XXX: Always use Mouse2Touch here.
    // We cannot reliably detect touch support normally
    // by evaluate (document instanceof DocumentTouch) on Desktop B2G.
    touchEvents.forEach(function bindEvents(name) {
      // window.addEventListener(name, this);
      Mouse2Touch.addEventHandler(window, name, this);
    }, this);

    window.addEventListener('screenchange', this);
    window.addEventListener('home', this, true);

    this.overlay.addEventListener('transitionend', this);
  }