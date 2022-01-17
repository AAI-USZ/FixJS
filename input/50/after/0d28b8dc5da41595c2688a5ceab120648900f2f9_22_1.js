function al_putAlarmList(alarm) {
      AlarmManager.setEnabled(alarm, alarm.enabled);
      self.refresh();
    }