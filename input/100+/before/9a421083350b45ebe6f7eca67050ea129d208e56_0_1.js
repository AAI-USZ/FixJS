function() {

      var ringtonePlayer = new Audio();
      ringtonePlayer.loop = true;
      var selectedAlarmSound = 'style/ringtones/classic.wav';
      ringtonePlayer.src = selectedAlarmSound;

      var power = navigator.mozPower;
      navigator.mozApps.getSelf().onsuccess = function(e) {
        var app = e.target.result;
        app.launch();
        if (power) {
          power.screenEnabled = true;
          var preferredBrightness = 0.8;
          power.screenBrightness = preferredBrightness;
        }
        if ('mozVibrate' in navigator) {
          var vibrateInterval = 0;
          vibrateInterval = window.setInterval(function vibrate() {
            navigator.mozVibrate([200]);
          }, 600);
          window.setTimeout(function clearVibration() {
            window.clearInterval(vibrateInterval);
          }, 3000);
        }
        ringtonePlayer.play();
        window.setTimeout(function pauseRingtone() {
          ringtonePlayer.pause();
        }, 2000);
      };
    }