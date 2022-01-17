function toBlogPosts(gists) {
		return _.chain(gists)
			.filter(isBlogGist)
			.map(toBlogPost)
			.sortBy(date)
			.value().reverse();
	}