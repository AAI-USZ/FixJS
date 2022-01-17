function aev_save() {
    if (this.element.dataset.id != '') {
      this.alarm.id = parseInt(this.element.dataset.id);
    } else {
      delete this.alarm.id;
    }
    var error = false;

    this.alarm.label = this.labelInput.value;
    this.alarm.hour = this.hourInput.value;
    this.alarm.minute = this.minuteInput.value;
    this.alarm.enabled = this.enableInput.checked;

    if (!this.alarm.label) {
      this.labelInput.nextElementSibling.textContent = _('required');
      error = true;
    }

    if (this.alarm.hour > 24 ||
      (this.alarm.hour == 24 && this.alarm.minute != 0)) {
      this.hourInput.nextElementSibling.textContent = _('invalid');
      error = true;
    }

    if (!error) {
      AlarmsDB.putAlarm(this.alarm, function al_putAlarmList(alarm) {
        AlarmManager.setEnabled(alarm, alarm.enabled);
        AlarmList.refresh();
      });
    }

    return !error;
  }