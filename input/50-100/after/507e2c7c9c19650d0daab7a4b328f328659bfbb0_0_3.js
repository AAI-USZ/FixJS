function() {
			deleteAllViews(userResultViews);
			SearchResult.each(this.addSearchResult);
		}