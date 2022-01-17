function(columnToCrop) {
	var term = new Term();
	var fullWidth = 1;
	for (var i = 0; i < this.widths.length ; i++) {
		fullWidth += this.widths[i];
		fullWidth++;
	}
	
	if ( fullWidth > term.getWidth() ) {  // we need to crop some data
		var newColWidth = this.widths[columnToCrop];
		newColWidth -= (fullWidth - term.getWidth());
		this.widths[columnToCrop] = newColWidth;
		for (var r = 0; r < this.data.length ; r++) {
			// TODO detect cropping and add singel char unicode elipse ⋯
			this.data[r][columnToCrop] = String(this.data[r][columnToCrop]).substring(0, newColWidth);
		}
	}
	
	// TODO throw if we still dont have enough space and this.throwOnError is set
}