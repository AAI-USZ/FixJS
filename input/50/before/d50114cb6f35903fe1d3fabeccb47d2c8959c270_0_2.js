function () {
	log('Triggered');
	socketServer.sockets.emit('triggered');
	soundAlarm();
}