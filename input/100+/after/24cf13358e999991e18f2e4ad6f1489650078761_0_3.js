function sb_updateBattery() {
    var mozBattery = window.navigator.battery;
    if (!mozBattery)
      return;

    var battery = this.battery;
    var fuel = this.batteryFuel;
    var charging = this.batteryCharging;

    var level = mozBattery.level * 100;

    if (mozBattery.charging) {
      charging.hidden = false;
      fuel.className = 'charging';
      fuel.style.minWidth = (level / 5.88) + 'px';
    } else {
      charging.hidden = true;

      fuel.style.minWidth = fuel.style.width = (level / 5.88) + 'px';
      if (level <= 10)
        fuel.className = 'critical';
      else if (level <= 30)
        fuel.className = 'low';
      else
        fuel.className = '';
    }
  }