function am_set(alarm, bSnooze) {
    var nextAlarmFireTime = null;
    if (bSnooze) {
      nextAlarmFireTime = new Date();
      nextAlarmFireTime.setMinutes(nextAlarmFireTime.getMinutes() +
                                   alarm.snooze);
    } else {
      nextAlarmFireTime = getNextAlarmFireTime(alarm);
    }
    var request = navigator.mozAlarms.add(nextAlarmFireTime, 'honorTimezone',
                  { id: alarm.id }); // give the alarm id for the request
    request.onsuccess = function(e) {
      alarm.alarmId = e.target.result;
      // save the AlarmAPI's request id to DB
      AlarmsDB.putAlarm(alarm, function am_putAlarm(alarm) {
        AlarmList.refresh();
      });
    };
    request.onerror = function(e) {
      var logInfo = bSnooze ? ' snooze' : '';
      console.log('set' + logInfo + ' alarm fail');
    };
  }