function aev_getDefaultAlarm() {
    // Reset the required message with default value
    return {
      id: '', // for Alarm APP indexedDB id
      alarmId: '', // for request AlarmAPI id
      label: 'Alarm',
      hour: '10',
      minute: '00',
      enabled: true,
      repeat: '0000000',
      sound: 'classic.wav',
      snooze: 5,
      color: 'Darkorange'
    };
  }