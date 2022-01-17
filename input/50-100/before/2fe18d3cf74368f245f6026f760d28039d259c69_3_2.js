function(connection) {
		var schema = require('../db/schemas')["schemas"].categorySchema;
		Category = connection.model('category', schema);
	}