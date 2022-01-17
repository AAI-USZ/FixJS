function ls_handleEvent(evt) {
    switch (evt.type) {
      case 'volumechange':
        this.updateMuteState();
        break;

      case 'screenchange':
        // XXX: If the screen is not turned off by ScreenManager
        // we would need to lock the screen again
        // when it's being turned back on
        this.lockIfEnabled(true);
        break;

      case 'mozChromeEvent':
        if (!this.locked || evt.detail.type !== 'desktop-notification')
          return;

        this.showNotification(evt.detail);
        break;

      case 'click':
        switch (evt.currentTarget) {
          case this.notification:
            this.hideNotification();
            break;
          case this.passcodePad:
            if (!evt.target.dataset.key)
              break;

            // Cancel the default action of <a>
            evt.preventDefault();
            this.handlePassCodeInput(evt.target.dataset.key);

            break;
        }
        break;

      case 'mousedown':
        var leftTarget = this.areaCamera;
        var rightTarget = this.areaUnlock;
        var handle = this.areaHandle;
        var overlay = this.overlay;
        var target = evt.target;
        target.setCapture(true);
        target.addEventListener('mouseup', this);

        switch (evt.target) {
          case leftTarget:
            overlay.classList.add('touched-left');
            break;

          case rightTarget:
            overlay.classList.add('touched-right');
            break;

          case this.areaHandle:

            this._touch = {
              initX: evt.screenX,
              initY: evt.screenY,
              target: null,
              leftTarget: leftTarget,
              rightTarget: rightTarget,
              initRailLength: this.railLeft.offsetWidth,
              maxHandleOffset: rightTarget.offsetLeft - handle.offsetLeft -
                (handle.offsetWidth - rightTarget.offsetWidth) / 2
            };
            overlay.classList.add('touched');
            target.addEventListener('mousemove', this);
            break;
        }
        break;

      case 'mousemove':
        this.handleMove(evt.screenX, evt.screenY);
        break;

      case 'mouseup':
        window.removeEventListener('mousemove', this);
        window.removeEventListener('mouseup', this);
        document.releaseCapture();

        if (evt.target !== this.areaHandle) {
          this.overlay.classList.remove('touched-left');
          this.overlay.classList.remove('touched-right');
          break;
        }

        this.handleMove(evt.screenX, evt.screenY);
        this.handleGesture();
        delete this._touch;
        this.overlay.classList.remove('touched');

        break;

      case 'transitionend':
        if (evt.currentTarget !== evt.target)
          return;

        if (!this.locked)
          this.switchPanel();

      case 'keyup':
        if (!this.locked)
          break;

        if (evt.keyCode !== evt.DOM_VK_ESCAPE &&
            evt.keyCode !== evt.DOM_VK_HOME)
          break;

        this.switchPanel();
        break;

      case 'load':
        this.camera.contentWindow.addEventListener(
          'keydown', (this.redirectKeyEventFromFrame).bind(this));
        this.camera.contentWindow.addEventListener(
          'keypress', (this.redirectKeyEventFromFrame).bind(this));
        this.camera.contentWindow.addEventListener(
          'keyup', (this.redirectKeyEventFromFrame).bind(this));
        break;

      case 'unload':
        this.camera.contentWindow.removeEventListener(
          'keydown', (this.redirectKeyEventFromFrame).bind(this));
        this.camera.contentWindow.removeEventListener(
          'keypress', (this.redirectKeyEventFromFrame).bind(this));
        this.camera.contentWindow.removeEventListener(
          'keyup', (this.redirectKeyEventFromFrame).bind(this));
        break;
    }
  }