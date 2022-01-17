function Path(str) {
		if (!str || str.length === 0) {
			return;
		}

		var self = this;
		var matches;
		var re = /(?:\/|^)([^\/]*)/g;

		while (matches = re.exec(str)) {
			self.push(matches[1]);
		}
	}