function loadFromDirectory(dir) {
		var newData = this.parseBestMatch(pathUtils.join(dir, this.file));
		this.result = Object.merge(newData, this.result);
		if (this.options.observer)
			this.options.observer(dir, newData);
		return this;
	}