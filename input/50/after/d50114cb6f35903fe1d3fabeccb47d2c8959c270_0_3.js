function (data) {
		log('Stopped');
		socketServer.sockets.emit('stop');
		
		if (player.playing()) {
			player.stop();
			//verifyAwake();
		} else {
			alarm.cancel();
			nextAlarm = null;
		}
	}