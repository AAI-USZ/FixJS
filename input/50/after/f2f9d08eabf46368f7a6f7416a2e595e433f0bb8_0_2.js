function(description) {
		description = $.trim(description);
		var match = description.match(/\[([^"]+)"(.*)"\]/);
		if (match)
			this.descriptions[$.trim(match[1])] = match[2];
	}