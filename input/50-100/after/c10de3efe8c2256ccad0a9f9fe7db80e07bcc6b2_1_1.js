function (propertyId, collection, data, cb) {
	if (propertyId && data[propertyId] && parseInt(data[propertyId], 10) > 0) {
		var id = data[propertyId];
		delete data[propertyId];

		this._updateRecord(collection, propertyId, data, id, cb);
	} else {
		this._insertRecord(collection, data, cb);
	}
}