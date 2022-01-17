function(oldFile, oldRow, isCapture, file, row) {
		if (typeof oldFile == 'number' && oldFile != this.file)
			return false;
		if (typeof oldRow  == 'number' && oldRow != this.row)
			return false;
		return this.canMoveTo(file, row, isCapture);
	}