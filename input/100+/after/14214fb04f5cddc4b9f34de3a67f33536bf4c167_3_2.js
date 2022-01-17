function(data, socket) {
		var characters = socket.client.getCharactersData();

		for (var i = characters.length-1; i >= 0; i--) {
			if (characters[i].id == data.id) {
				socket.client.getCharactersData().splice(i, 1);
			}
		}

		Cassidie.database.update('users', {email: socket.client.email}, {characters: socket.client.getCharactersData()}, function() {
			socket.emit('character_removed');
		});
	}