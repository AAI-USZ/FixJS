function (data) {
		alarm.setTime.apply(alarm, parseTime(data.time));
		nextAlarm = alarm.getNext();
		lastAlarmStr = nextAlarm.format('HH:MM');
		log('Set to ' + lastAlarmStr);
		socketServer.sockets.emit('set', { string: lastAlarmStr });
	}