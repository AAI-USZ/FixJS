function bs_incomingHandler(evt) {
    var call = null;
    telephony.calls.some(function(aCall) {
      if (aCall.state == 'incoming' || aCall.state == 'dialing') {
        call = aCall;
        return true;
      }
      return false;
    });

    if (!call)
      return;

    var host = document.location.host;
    window.open('http://' + host + '/oncall.html#' + call.state,
                'call_screen', 'attention');

    if (call.state != 'incoming')
      return;

    var vibrateInterval = 0;
    if (activateVibration) {
      vibrateInterval = window.setInterval(function vibrate() {
        if ('vibrate' in navigator) {
          navigator.vibrate([200]);
        }
      }, 600);
    }

    if (activePhoneSound && selectedPhoneSound) {
      ringtonePlayer.play();
    }

    call.onstatechange = function callStateChange() {
      call.onstatechange = null;

      ringtonePlayer.pause();
      window.clearInterval(vibrateInterval);

      // The call wasn't picked up
      if (call.state == 'disconnected') {
        navigator.mozApps.getSelf().onsuccess = function getSelfCB(evt) {
          var app = evt.target.result;

          var iconURL = NotificationHelper.getIconURI(app);

          var notiClick = function() {
            // Asking to launch itself
            app.launch('#recents-view');
          };

          var title = 'Missed call';
          var body = 'From ' + call.number;

          NotificationHelper.send(title, body, iconURL, notiClick);
        };
      }
    };
  }