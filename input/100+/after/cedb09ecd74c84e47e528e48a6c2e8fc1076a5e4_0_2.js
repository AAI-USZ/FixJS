function(data) {
		socket.send('controller', {data: data});
	}