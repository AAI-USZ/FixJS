function(oldFile, oldRow, isCapture, file, row) {
		if (oldFile != undefined && oldFile != this.file)
			return false;
		if (oldRow != undefined && oldRow != this.row)
			return false;
		return this.canMoveTo(file, row, isCapture);
	}