function soundManager_changeVolume(delta) {
    var volume = this.currentVolume + delta;
    this.currentVolume = volume = Math.max(0, Math.min(10, volume));

    var notification = document.getElementById('volume');
    var classes = notification.classList;
    if (volume == 0) {
      classes.add('vibration');
    } else {
      classes.remove('vibration');
    }

    var steps = notification.children;
    for (var i = 0; i < steps.length; i++) {
      var step = steps[i];
      if (i < volume)
        step.classList.add('active');
      else
        step.classList.remove('active');
    }

    classes.add('visible');
    if (this._timeout)
      window.clearTimeout(this._timeout);

    this._timeout = window.setTimeout(function hideSound() {
      classes.remove('visible');
    }, 1500);

    this.fireVolumeChangeEvent();
  }