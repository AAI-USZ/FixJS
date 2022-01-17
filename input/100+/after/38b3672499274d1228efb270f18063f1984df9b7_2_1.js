function qs_handleEvent(evt) {
    evt.preventDefault();
    switch (evt.type) {
      case 'click':
        switch (evt.target) {
          case this.wifi:
            // XXX: should use mozSettings instead
            var wifiManager = navigator.mozWifiManager;
            if (!wifiManager)
              return;

            var enabled = (this.wifi.dataset.enabled == 'true');
            wifiManager.setEnabled(!enabled);
            this.wifi.dataset.enabled = !enabled;
            break;

          case this.data:
            var enabled = (this.data.dataset.enabled == 'true');
            // the actual mozSettings request is async,
            // but we want to be responsive to user input
            // and double click so we'll change the UI state here
            this.data.dataset.enabled = !enabled;

            navigator.mozSettings.getLock().set({
              'ril.data.enabled': !enabled
            });

            break;

          case this.bluetooth:
            var enabled = (this.bluetooth.dataset.enabled == 'true');
            this.bluetooth.dataset.enabled = !enabled;
            navigator.mozSettings.getLock().set({
              'bluetooth.enabled': !enabled
            });
            break;

          case this.powerSave:
            var enabled = (this.powerSave.dataset.enabled == 'true');
            this.powerSave.dataset.enabled = !enabled;
            if (!enabled) {
              // Keep the original states
              this._powerSaveResume = {
                wifi: (this.wifi.dataset.enabled == 'true'),
                data: (this.data.dataset.enabled == 'true'),
                bluetooth: (this.bluetooth.dataset.enabled == 'true')
              };

              // Turn off Wifi
              // XXX: should use mozSetting instead
              var wifiManager = navigator.mozWifiManager;
              if (wifiManager) {
                wifiManager.setEnabled(false);
                this.wifi.dataset.enabled = false;
              }

              // Turn off Data
              this.data.dataset.enabled = false;
              navigator.mozSettings.getLock().set({
                'ril.data.enabled': false
              });

              // Turn off Bluetooth
              this.bluetooth.dataset.enabled = false;
              navigator.mozSettings.getLock().set({
                'bluetooth.enabled': false
              });

              // XXX: How do I turn off GPS?

            } else if (this._powerSaveResume) {
              if (this._powerSaveResume.wifi) {
                // Turn on Wifi
                // XXX: use mozSetting instead
                var wifiManager = navigator.mozWifiManager;
                if (wifiManager) {
                  wifiManager.setEnabled(true);
                  this.wifi.dataset.enabled = true;
                }
              }

              if (this._powerSaveResume.data) {
                // Turn on Data
                this.data.dataset.enabled = true;
                navigator.mozSettings.getLock().set({
                  'ril.data.enabled': true
                });
              }

              if (this._powerSaveResume.bluetooth) {
                // Turn on Bluetooth
                this.bluetooth.dataset.enabled = true;
                navigator.mozSettings.getLock().set({
                  'bluetooth.enabled': true
                });
              }

              delete this._powerSaveResume;
            }

            break;

          case this.fullApp:
            // XXX: This should be replaced probably by Web Activities
            var host = document.location.host;
            var domain = host.replace(/(^[\w\d]+\.)?([\w\d]+\.[a-z]+)/, '$2');
            var protocol = document.location.protocol + '//';
            Applications.getByOrigin(protocol + 'settings.' + domain).launch();

            window.addEventListener('appopen', function hideTray(evt) {
              window.removeEventListener('appopen', hideTray);
              UtilityTray.hide();
            });

            break;
        }
        break;

      case 'utilitytrayshow':
        this.updateStatus();
        break;
    }
  }