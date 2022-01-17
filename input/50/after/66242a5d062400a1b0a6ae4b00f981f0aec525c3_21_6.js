function al_putAlarmList(alarm) {
        AlarmManager.setEnabled(alarm, alarm.enabled);
        AlarmList.refresh();
      }