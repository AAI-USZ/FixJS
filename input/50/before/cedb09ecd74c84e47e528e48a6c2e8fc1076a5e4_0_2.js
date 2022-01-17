function(id, direction) {
		console.log('click', id, direction);
		socket.emit('controller', { 
			data: {
				button: id,
				direction: direction
			}
		});
	}