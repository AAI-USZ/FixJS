function am_onAlarmFiredHandler(message) {
    // XXX receive and paser the alarm id from the message
    var id = message.data.id;
    // use the alarm id to query db
    // find out which alarm is being fired.
    var self = this;
    AlarmsDB.getAlarm(id, function am_gotAlarm(alarm) {
      // prepare to pop out attention screen, ring the ringtone, vibrate
      self._onFireAlarm = alarm;
      var protocol = window.location.protocol;
      var host = window.location.host;
      window.open(protocol + '//' + host + '/onring.html',
                  'ring_screen', 'attention');
    });
    this.updateAlarmStatusBar();
  }