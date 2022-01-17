function (socket) {
	socket.emit('init', {
		time: nextAlarm ? nextAlarm.format('HH:MM') : null,
		triggered: player.playing(),
		//canVerifyAwake: canVerifyAwake,
		logHistory: logHistory
	});
	
	socket.on('set', function (data) {
		alarm.setTime.apply(alarm, parseTime(data.time));
		nextAlarm = alarm.getNext();
		log('Set to ' + nextAlarm.format('HH:MM'));
		socketServer.sockets.emit('set', { next: nextAlarm });
	});
	
	socket.on('stop', function (data) {
		if (player.playing()) {
			log('Stopped');
			socketServer.sockets.emit('stop');
			player.stop();
			//verifyAwake();
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