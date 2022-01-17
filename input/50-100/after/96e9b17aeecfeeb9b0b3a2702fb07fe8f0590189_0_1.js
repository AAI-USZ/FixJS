function loadFromDirectory(dir) {
		var newData = this.parseBestMatch(pathUtils.join(dir, this.file));
		this.result = Object.merge(newData, this.result);
		if (this.options.debug)
			console.error('Loading config from "' + dir + '", now having', newData);
		return this;
	}