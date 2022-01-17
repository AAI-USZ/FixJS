function(data) {
			app.collections.pages.reset(data.links);

			if(!data.items) return [];

			return data.items.map(function(item) {
				return new Models.Article(item);
			});
		}