function processTags(/**string*/ keyLine) {
		var tags = [],
			tag;

		// The standard is to put all the tags within one set of brackets, but we'll allow for multiple brackets too.
		while ((tag = tagRe.exec(keyLine))) {
			tags = tags.concat(tag[1].trim().split(/ +/));
		}

		return tags;
	}