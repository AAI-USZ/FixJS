function(data) {
		if (!socket.client.getAuthenticated()) return;
		socket.client.character.setParameter(data.parameter, data.value);
	}