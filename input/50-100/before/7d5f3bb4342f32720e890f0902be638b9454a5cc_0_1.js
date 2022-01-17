function processTags(/**string*/ keyLine) {
		var tags = [],
			tag;

		while ((tag = tagRe.exec(keyLine))) {
			tags.push(tag[1]);
		}

		return tags;
	}