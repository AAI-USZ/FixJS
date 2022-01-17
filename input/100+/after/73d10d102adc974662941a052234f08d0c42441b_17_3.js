function personString(authors) {
		var result = [],
			index = 0;

		if (typeof(authors) === "undefined") {
			return "No authors";
		}

		for (index = 0; index < authors.length; index++) {
			result.push(authors[index].given + " " + authors[index].family);
		}
		return result.join(", ");
	}