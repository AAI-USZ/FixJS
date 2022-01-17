function(client, data, level) {

		if (data.action == 'player') {
			var targetClient = Cassidie.getClientsFromCharacterName(data.player);

			if (targetClient != undefined) {
				targetClient.socket.emit('chat_receive', {action: 'player', player: client.character.attributes.name, message: data.message});
			}
		}

		if (data.action == 'speak') {
			var characters 	= [];
			var player		= null;

			if (client.character == undefined) {
				if (level == undefined) return;
				characters	= level.getCharactersByRang(client, Cassidie.game.chatDistance);
				player		= client.attributes.name;
				id			= client.id;
			} else {
				characters	= client.character.level.getCharactersByRang(client.character, Cassidie.game.chatDistance);
				player		= client.character.attributes.name;
				id			= client.character.id;
			}

			for (var i = 0; i < characters.length; i++) {
				if (characters[i].attributes.name != data.player && characters[i].client != undefined) {
					characters[i].client.socket.emit('chat_receive', {action: 'speak', characterId: id, player: player, message: data.message});
				}
			}
		}

		if (data.action == 'level') {
			client.socket.broadcast.to(client.character.level.name).emit('chat_receive', {action: 'level', level: client.character.level.title, player: client.character.attributes.name, message: data.message});
		}
	}