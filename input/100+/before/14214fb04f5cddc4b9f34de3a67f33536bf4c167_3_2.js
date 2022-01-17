function() {
	var crypto = require('crypto');

	this.Account = {};

	this.Account.register = function(_data, socket) {
		Cassidie.database.find('users', {email: _data.email}, function(data) {
			if (data.length > 0 ) {
				socket.emit('register_fail', _data);
			} else {
				_data.password = crypto.createHmac('sha1', 'abc').update(_data.password).digest('hex');

				Cassidie.database.insert('users', {email: _data.email, password: _data.password, nickname: _data.nickname, characters: []}, function() {
					socket.emit('register_success', _data);
				});
			}
		});
	};

	this.Account.login = function(_data, socket) {
		Cassidie.database.find('users', {email: _data.email}, function(data) {
			if (data.length == 0 ) {
				socket.emit('login_fail', _data);
			} else {
				_data.password = crypto.createHmac('sha1', 'abc').update(_data.password).digest('hex');

				if (_data.password == data[0].password) {
					socket.client.setAuthenticated(true);
					socket.client.setEmail(data[0].email);
					socket.client.setNickname(data[0].nickname);
					socket.client.setCharactersData(data[0].characters);

					socket.emit('login_success', _data);
					Logger.systemLog(Cassidie.consoleName, socket.client.email+' logged in');
				} else {
					socket.emit('login_fail', _data);			
					Logger.systemLog(Cassidie.consoleName, 'login failed for '+socket.client.email);
				}
			}
		});
	};

	this.Account.logout = function(socket) {
		socket.client.setAuthenticated(false);
		socket.client.setEmail('');
		socket.client.setNickname('');

		socket.emit('logout');
		Logger.systemLog(Cassidie.consoleName, socket.client.email+' logged out');
	};

	this.Account.getCharacterList = function(socket) {
		var charactersData = socket.client.getCharactersData();

		socket.emit('character_list', charactersData);
	};

	this.Account.getCharacterStructure = function(socket) {
		var temporaryPlayer = new Cassidie.game.playerClass();

		socket.emit('character_structure', temporaryPlayer.attributes);		
	};

	this.Account.createCharacter = function(data, socket) {
		if (socket.client.getCharactersData().length == Cassidie.game.maxCharacters) {
			socket.emit('character_not_created', {message: 'too_many_characters'});
			return;
		}

		var characterNameQuery = new RegExp(data.name.toLowerCase(), 'i');
		var characterData		= data;
		Cassidie.database.find('users', {characters: {$elemMatch : {name: characterNameQuery}}}, function(data) {
			if (data.length == 0) {
				var temporaryPlayer = new Cassidie.game.playerClass();
				temporaryPlayer.attributes = characterData;
				socket.client.getCharactersData().push(temporaryPlayer.getData());
				Cassidie.database.update('users', {email: socket.client.email}, {characters: socket.client.getCharactersData()}, function() {
					socket.emit('character_created');			
				});
			} else {
				socket.emit('character_not_created', {message: 'name_already_used'});
			}
		});


	};

	this.Account.remove_character = function(data, socket) {
		socket.client.getCharactersData().splice(data.id, 1);

		Cassidie.database.update('users', {email: socket.client.email}, {characters: socket.client.getCharactersData()}, function() {
			socket.emit('character_removed');
		});
	};
}