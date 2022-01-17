function sm_generateItems() {
    var items = [];
    var settings = window.navigator.mozSettings;
    var _ = navigator.mozL10n.get;
    var options = {
      airplane: {
        label: _('airplane'),
        value: 'airplane',
        icon: '/style/sleep_menu/images/airplane.png'
      },
      airplaneOff: {
        label: _('airplaneOff'),
        value: 'airplane'
      },
      silent: {
        label: _('silent'),
        value: 'silent',
        icon: '/style/sleep_menu/images/vibration.png'
      },
      silentOff: {
        label: _('normal'),
        value: 'silentOff'
      },
      restart: {
        label: _('restart'),
        value: 'restart',
        icon: '/style/sleep_menu/images/power-off.png'
      },
      power: {
        label: _('power'),
        value: 'power',
        icon: '/style/sleep_menu/images/restart.png'
      }
    };

    if (this.isFlightModeEnabled) {
      items.push(options.airplaneOff);
    } else {
      items.push(options.airplane);
    }

    if (!this.isSilentModeEnabled) {
      items.push(options.silent);
    } else {
      items.push(options.silentOff);
    }

    items.push(options.restart);
    items.push(options.power);

    return items;
  }