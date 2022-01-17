function authorString(authors) {
		var result = [],
			index = 0;
		for (index = 0; index < authors.length; index++) {
			result.push(authors[index].given + " " + authors[index].family);
		}
		return result.join(", ");
	}