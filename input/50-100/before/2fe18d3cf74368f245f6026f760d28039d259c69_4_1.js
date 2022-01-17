function(connection) {
		schema = require('../db/schemas')["schemas"].gameSchema;
		Game = connection.model('game', schema);
	}