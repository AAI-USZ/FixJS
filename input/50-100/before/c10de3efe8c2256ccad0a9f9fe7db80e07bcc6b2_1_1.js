function (idProp, collection, data, callback) {
	if (idProp && data[idProp] && parseInt(data[idProp], 10) > 0) {
		var id = data[idProp];
		delete data[idProp];

		this._updateRecord(collection, idProp, data, id, callback);
	} else {
		this._insertRecord(collection, data, callback);
	}
}