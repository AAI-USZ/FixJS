function (socket) {
	socket.emit('init', {
		lastAlarmStr: lastAlarmStr,
		alarmSet: !!nextAlarm,
		triggered: player.playing(),
		//canVerifyAwake: canVerifyAwake,
		logHistory: logHistory
	});
	
	socket.on('set', function (data) {
		alarm.setTime.apply(alarm, parseTime(data.time));
		nextAlarm = alarm.getNext();
		lastAlarmStr = nextAlarm.format('HH:MM');
		log('Set to ' + lastAlarmStr);
		socketServer.sockets.emit('set', { string: lastAlarmStr });
	});
	
	socket.on('stop', function (data) {
		log('Stopped');
		socketServer.sockets.emit('stop');
		
		if (player.playing()) {
			player.stop();
			//verifyAwake();
		} else {
			alarm.cancel();
			nextAlarm = null;
		}
	});
	
	/*socket.on('awake', function (data) {
		verifiedAwake();
	});*/
	
	/*socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});*/
}