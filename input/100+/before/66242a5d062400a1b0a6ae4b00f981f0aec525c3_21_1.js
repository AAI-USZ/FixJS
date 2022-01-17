function() {

      var ringtonePlayer = new Audio();
      ringtonePlayer.loop = true;
      var selectedAlarmSound = 'style/ringtones/classic.wav';
      ringtonePlayer.src = selectedAlarmSound;

      var protocol = window.location.protocol;
      var host = window.location.host;
      window.open(protocol + '//' + host + '/onring.html',
                  'ring_screen', 'attention');

      if ('vibrate' in navigator) {
        var vibrateInterval = 0;
        vibrateInterval = window.setInterval(function vibrate() {
          navigator.vibrate([200]);
        }, 600);
        window.setTimeout(function clearVibration() {
          window.clearInterval(vibrateInterval);
        }, 3000);
      }
      ringtonePlayer.play();
      window.setTimeout(function pauseRingtone() {
        ringtonePlayer.pause();
      }, 2000);
    }