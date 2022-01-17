function setupForeman(foreman, supervisor) {
	console.log('Setting up new foreman/supervisor at ' + foreman + '/' + supervisor)
	if (!foremen[foreman])
		foremen[foreman] = {};
	foremen[foreman][supervisor] = io.of('/' + foreman + '/' + supervisor)
	.on('connection',function(socket) {
		// Tell the client to start sending reports here
		socket.emit('GetToWork!');
		console.log('someone connected to ' + supervisor);
		socket.on('log',function(data) {
			// Send a message to everyone listening on this namespace EXCEPT the socket
			console.log('Emitting data from crewmember');
			console.log(data);
			socket.broadcast.send(data);
			// TODO: Store messages for this Foreman for later analysis
		});
	});
}