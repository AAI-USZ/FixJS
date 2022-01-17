function loadFromDirectory(dir) {
		var newData = this.parseBestMatch(pathUtils.join(dir, this.file));
		this.result = Object.merge(newData, this.result);
		return this;
	}