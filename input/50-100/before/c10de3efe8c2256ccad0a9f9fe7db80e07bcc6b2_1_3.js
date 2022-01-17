function (collection, idProp, data, id, callback) {
	return helpers.createSqlUpdate({
		table: this._collectionToTable(collection),
		key: idProp,
		id: id,
		escape: this._escapeId,
		info: helpers.escapeUpdateFields(data, this._escapeId, {
			date_convert_fmt: "FROM_UNIXTIME(?)",
			boolean_convert: this._booleanToSqlValue
		}),
		db: this._client,
		callback: helpers.handleSqlUpdateCall(callback)
	});
}