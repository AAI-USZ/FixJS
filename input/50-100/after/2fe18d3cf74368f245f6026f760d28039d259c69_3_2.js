function(connection) {
		var mongoose = require('mongoose')
		  , schemas = require('../db/schemas')["schemas"]
		  , categorySchema = schemas.categorySchema
		  , gameSchema = schemas.gameSchema;
		
		Category = connection.model('Category', categorySchema);
		mongoose.model('Game', gameSchema);
	}