function(url, groupNumber) {
		var links = [];
		groupNumber = groupNumber || 0;

		if(ret.IsFuskable(url)) {
			var matches = regex.exec(url);
			links = GetUrls(matches[1],matches[4], matches[2], matches[3],groupNumber);
		}
		return links;
	}