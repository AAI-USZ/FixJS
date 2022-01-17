function lowercaseHashtags(hashtags) {
	var parsed = [];

	var length = hashtags.length;
	for (var i = 0; i < length; i++) {
		parsed.push(hashtags[i].text.toLowerCase());
	}

	return parsed;
}