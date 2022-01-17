function(min) {
	this.widths = [];
	for (var c = 0; c < this.titles.length ; c++) {
		this.widths.push(Math.max(this.titles[c].length, min));
	}

	for (var r = 0; r < this.data.length ; r++) {

		for (var c = 0; c < this.data[r].length ; c++) {
			var len = String(this.data[r][c]).length;
			this.widths[c] = Math.max(this.widths[c], len);
		}

	}
	
	// create padding spaces needed for aligning tables
	var maxWidth = this.widths[0]
	for (var i = 1; i < this.widths.length ; i++) {
		maxWidth = Math.max(maxWidth, this.widths[i]);
	}
	for (var i = 0; i < maxWidth ; i++) {
		this._blanks += " ";
	}
	
}