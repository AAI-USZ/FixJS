function(description) {
		var match = description.match(/ /);
		if (match)
			this.descriptions[match[1]] = match[2];
	}