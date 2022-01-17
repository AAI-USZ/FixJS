function(id, direction) {
		console.log(id, direction);
		socket.emit('controller', { 
			data: {
				button: id,
				direction: direction
			}
		});
	}