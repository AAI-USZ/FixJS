function am_unset(alarm) {
    if (alarm.alarmId) {
      navigator.mozAlarms.remove(alarm.alarmId);
    }
  }