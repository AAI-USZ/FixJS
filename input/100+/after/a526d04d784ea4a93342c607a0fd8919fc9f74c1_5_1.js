function ut_handleEvent(evt) {
    switch (evt.type) {
      case 'home':
        if (this.shown) {
          this.hide();
          evt.stopImmediatePropagation();
        }
        break;

      case 'screenchange':
        if (this.shown && !evt.detail.screenEnabled)
          this.hide(true);

        break;

      case 'touchstart':
        if (LockScreen.locked)
          return;
        if (evt.target !== this.overlay &&
            evt.target !== this.statusbar)
          return;

        this.active = true;
        // XXX: required for Mouse2Touch fake events to function
        evt.target.setCapture(true);

        this.onTouchStart(evt.touches[0]);
        break;

      case 'touchmove':
      if (!this.active)
        return;

        this.onTouchMove(evt.touches[0]);
        break;

      case 'touchend':
        if (!this.active)
          return;

        this.active = false;
        // XXX: required for Mouse2Touch fake events to function
        document.releaseCapture();

        this.onTouchEnd(evt.changedTouches[0]);
        break;

      case 'transitionend':
        if (!this.shown)
          this.screen.classList.remove('utility-tray');
        break;
    }
  }