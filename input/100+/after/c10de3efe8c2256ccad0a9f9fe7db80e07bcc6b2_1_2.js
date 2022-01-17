function (collection, config) {
	var query = "DELETE FROM " + this._escapeId(this._collectionToTable(collection));
	var tmp;
	var values = [];

	config = config || {};

	if (config.conditions) {
		tmp = this._addQueryConditions(config.conditions);
		query += tmp[0];
		values = values.concat(tmp[1]);
	}
	if (config.order) {
		query += helpers.buildSqlOrder(config.order, this._escapeId);
	}
	if (config.limit) {
		query += helpers.buildSqlLimit(config.limit, config.skip);
	}

	this._client.query(query, values, function (err, info) {
		if (err) {
			config.callback(err);
			return;
		}

		config.callback(null, info);
	});
}