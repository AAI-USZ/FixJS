function am_gotAlarm(alarm) {
      // prepare to pop out attention screen, ring the ringtone, vibrate
      self._onFireAlarm = alarm;
      var protocol = window.location.protocol;
      var host = window.location.host;
      window.open(protocol + '//' + host + '/onring.html',
                  'ring_screen', 'attention');
    }