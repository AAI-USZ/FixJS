function sm_handleEvent(evt) {
    switch (evt.type) {
      case 'keydown':
        // The screenshot module also listens for the SLEEP key and
        // can call defaultPrevented() on keydown and key up events.
        if (evt.keyCode == evt.DOM_VK_SLEEP &&
            !evt.defultPrevented && !ListMenu.visible) {
          this._longpressTriggered = false;
          this._sleepMenuTimeout = window.setTimeout((function sm_timeout() {
            this.show();
            this._longpressTriggered = true;
            this._sleepMenuTimeout = null;
          }).bind(this), 1500);
        }
        break;

      case 'keyup':
        if (ListMenu.visible) {
          if (evt.keyCode == evt.DOM_VK_SLEEP &&
              this._longpressTriggered) {
            evt.stopPropagation();
            this._longpressTriggered = false;
          }

          return;
        }

        if (!this._sleepMenuTimeout || evt.keyCode != evt.DOM_VK_SLEEP)
          return;

        window.clearTimeout(this._sleepMenuTimeout);
        this._sleepMenuTimeout = null;

        break;
    }
  }