function al_updateAlarmEnableState(enabled, alarm) {
    if (alarm.enabled == enabled)
      return;

    alarm.enabled = enabled;

    var self = this;
    AlarmsDB.putAlarm(alarm, function al_putAlarmList(alarm) {
      AlarmManager.setEnabled(alarm, alarm.enabled);
      self.refresh();
    });
  }