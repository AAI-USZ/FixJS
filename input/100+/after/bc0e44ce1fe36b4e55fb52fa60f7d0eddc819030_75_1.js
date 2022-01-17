function changeVolume(delta) {
    var volume = currentVolume + delta;
    currentVolume = volume = Math.max(0, Math.min(10, volume));

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
      if (i < volume) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    }

    classes.add('visible');
    window.clearTimeout(activeTimeout);
    activeTimeout = window.setTimeout(function hideSound() {
      classes.remove('visible');
    }, 1500);

    if ('mozSettings' in navigator) {
      navigator.mozSettings.getLock().set({
        'audio.volume.master': currentVolume / 10
      });
    }
  }