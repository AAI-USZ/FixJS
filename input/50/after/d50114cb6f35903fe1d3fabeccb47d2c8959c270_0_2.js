function () {
	nextAlarm = null;
	log('Triggered');
	socketServer.sockets.emit('triggered');
	soundAlarm();
}