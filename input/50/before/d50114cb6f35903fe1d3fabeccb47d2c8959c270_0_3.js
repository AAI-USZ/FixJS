function (data) {
		if (player.playing()) {
			log('Stopped');
			socketServer.sockets.emit('stop');
			player.stop();
			//verifyAwake();
		}
	}