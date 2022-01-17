function(key, auth, data) {
	this.key = key;
	this.auth = auth;
	this.title = data.title["#"];
	this.updated = data.updated;
	this.author = data.author;

	this.worksheets = [];
	var worksheets = forceArray(data.entry);

	worksheets.forEach(function(worksheetData) {
		this.worksheets.push(new Worksheet(this, worksheetData));
	}, this);
}