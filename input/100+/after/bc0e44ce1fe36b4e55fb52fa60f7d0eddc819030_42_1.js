function rv_ring() {
    this._ringtonePlayer = new Audio();
    var ringtonePlayer = this._ringtonePlayer;
    ringtonePlayer.loop = true;
    // XXX Need to set the ringtone according to alarm's property of 'sound'
    var selectedAlarmSound = 'style/ringtones/classic.wav';
    ringtonePlayer.src = selectedAlarmSound;
    ringtonePlayer.play();
    /* If user don't handle the onFire alarm,
       pause the ringtone after 20 secs */
    window.setTimeout(function rv_pauseRingtone() {
      ringtonePlayer.pause();
    }, 20000);
  }