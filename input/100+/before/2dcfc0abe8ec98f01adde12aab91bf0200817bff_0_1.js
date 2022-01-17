function ut_handleEvent(evt) {
    switch (evt.type) {
      case 'keyup':
        if (!this.shown || evt.keyCode !== evt.DOM_VK_ESCAPE)
          return;

        // doesn't work right now, see:
        // https://github.com/mozilla-b2g/gaia/issues/1663
        evt.preventDefault();
        evt.stopPropagation();

        this.hide();
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
        {
          this.screen.classList.remove('utility-tray');
          this.firstShown.style.MozTransition = '';
          if (this.phase2hide) {
            this.firstShown.style.MozTransition = '-moz-transform 0.2s linear';
            this.firstShown.style.MozTransform =
              'translateY(' + this.firstShownPosition + 'px)';
            this.overlay.style.MozTransition = '-moz-transform 0.2s linear';
            this.overlay.style.MozTransform = 'translateY(0)';
            if (evt.target == this.firstShown)
              this.phase2hide = false;
          } else {
            // Reset position of this.firstShown
            this.firstShown.style.MozTransition = '';
            this.firstShown.style.MozTransform = 'translateY(0)';
          }
        }
        break;
    }
  }