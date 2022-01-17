function soundManager_changeVolume(delta) {
    var volume = this.level + delta;
    this.level = volume = Math.max(0, Math.min(10, volume));
    this.currentVolume = Math.pow(this.level, 2);

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

    var settings = navigator.mozSettings;
    if (settings) {
      settings.getLock().set({'audio.volume.master': this.currentVolume / 10});
    }

    this.fireVolumeChangeEvent();
  }