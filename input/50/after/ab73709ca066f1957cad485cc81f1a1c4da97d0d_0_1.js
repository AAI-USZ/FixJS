function() {
	var id = this.body._id;
	if (!id) {
		id = this.body._id = Document.generateId();
	}
	return id;
}