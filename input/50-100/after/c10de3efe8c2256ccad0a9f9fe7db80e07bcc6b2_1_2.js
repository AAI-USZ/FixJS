function (collection, data, cb) {
	return helpers.createSqlInsert({
		table: this._collectionToTable(collection),
		escape: this._escapeId,
		info: helpers.escapeInsertFields(data, {
			date_convert_fmt: "FROM_UNIXTIME(?)",
			boolean_convert: this._booleanToSqlValue
		}),
		orm: this._orm,
		data: data,
		db: this._client,
		callback: cb
	});
}