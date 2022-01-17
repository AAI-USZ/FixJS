function aev_delete() {
    if (!this.element.dataset.id)
      return;

    var alarm = this.alarm;
    if (alarm.alarmId)
      AlarmManager.setEnabled(alarm, false);

    var id = parseInt(this.element.dataset.id);
    AlarmsDB.deleteAlarm(id, function al_deletedAlarm() {
      AlarmList.refresh();
    });
  }