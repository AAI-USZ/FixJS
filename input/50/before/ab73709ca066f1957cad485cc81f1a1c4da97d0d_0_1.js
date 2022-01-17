function() {
	var id = this._raw._id;
	if (!id) {
		id = this._raw._id = Document.generateId();
	}
	return id;
}