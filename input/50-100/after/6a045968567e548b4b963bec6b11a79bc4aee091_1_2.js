function(posts) {
			lastGet = new Date();
			_indexViewModelCache.posts = posts;
			isRefreshingIndexViewModel = false;
			callback(_indexViewModelCache);
		}