function al_updateAlarmEnableState(enabled, alarm) {
    if (alarm.enabled == enabled)
      return;

    alarm.enabled = enabled;

    var self = this;
    AlarmsDB.putAlarm(alarm, function al_putAlarmList() {
      self.refresh();
    });
    if (enabled) {
      FakeAlarmManager.set(alarm);
    } else {
      FakeAlarmManager.cancel(alarm);
    }
  }