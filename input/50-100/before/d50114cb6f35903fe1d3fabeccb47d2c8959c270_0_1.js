function (data) {
		alarm.setTime.apply(alarm, parseTime(data.time));
		nextAlarm = alarm.getNext();
		log('Set to ' + nextAlarm.format('HH:MM'));
		socketServer.sockets.emit('set', { next: nextAlarm });
	}