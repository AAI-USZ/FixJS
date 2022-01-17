function(mins, callback) {
    log("start timer for " + mins + " mins");

    var duration = Math.round(mins*60);
    var timer = duration;
    stateStart(timer);

    (function tick() {
      stateCounting(timer, duration);
      
      if(timer <= 0) {
        callback();
        soundManager.setVolume(settings.timerEndSoundId, volume).play();
      }
      else {
        timer--;
        timerInterval = setTimeout(tick, 1000);
      }
    })();
  }