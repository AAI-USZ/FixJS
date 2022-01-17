function sm_handleEvent(evt) {
    switch (evt.type) {
      case 'screenchange':
        if (!evt.detail.screenEnabled)
          this.hide();
        break;

      case 'click':
        var action = evt.target.dataset.value;
        switch (action) {
          case 'airplane':
            var settings = window.navigator.mozSettings;
            if (settings) {
              var settingName = 'ril.radio.disabled';
              var req = settings.getLock().get(settingName);
              req.onsuccess = function() {
                var newValue = !req.result[settingName];
                settings.getLock().set({'ril.radio.disabled': newValue});
              }
            }

            break;
          case 'silent':
            var settings = window.navigator.mozSettings;
            if (settings)
              settings.getLock().set({ 'phone.ring.incoming': false});

            document.getElementById('silent').hidden = true;
            document.getElementById('normal').hidden = false;
            break;
          case 'normal':
            var settings = window.navigator.mozSettings;
            if (settings)
              settings.getLock().set({'phone.ring.incoming': true});

            document.getElementById('silent').hidden = false;
            document.getElementById('normal').hidden = true;
            break;
          case 'restart':
            navigator.mozPower.reboot();
            break;
          case 'power':
            navigator.mozPower.powerOff();
            break;
        }
        this.hide();
        break;

      case 'keydown':
        // The screenshot module also listens for the SLEEP key and
        // can call defaultPrevented() on keydown and key up events.
        if (evt.keyCode == evt.DOM_VK_SLEEP &&
            !evt.defultPrevented && !this.visible) {
          this._longpressTriggered = false;
          this._sleepMenuTimeout = window.setTimeout((function sm_timeout() {
            this.show();
            this._longpressTriggered = true;
            this._sleepMenuTimeout = null;
          }).bind(this), 1500);
        }
        break;

      case 'keyup':
        if (this.visible) {
          if (evt.keyCode == evt.DOM_VK_ESCAPE ||
              evt.keyCode == evt.DOM_VK_HOME) {

              this.hide();
              evt.stopPropagation();
          }

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