function(connection) {
		var mongoose = require('mongoose')
		  ,	schemas = require('../db/schemas')["schemas"]
		  , gameSchema = schemas.gameSchema
		  , categorySchema = schemas.categorySchema;
		
		Game = connection.model('game', gameSchema);
		mongoose.model('Category', categorySchema);
	}