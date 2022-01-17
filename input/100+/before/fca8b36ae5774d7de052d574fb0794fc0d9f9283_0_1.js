function getIndexViewModel(callback) {
	
	var age = (new Date() - lastGet) / 60000;
	var hasOldCache = _indexViewModelCache.posts.length > 0;
	var isRefreshing = isRefreshingIndexViewModel;
	var needsRefresh = age > 1;

	if (!hasOldCache) {
		// block the caller while waiting for the data
		console.log('refreshing the index view model for the first time');
		refreshIndexViewModel(callback);
	} else {
		if (needsRefresh && !isRefreshing) {
			// refresh without blocking
			console.log('refreshing the index view model, async')
			refreshIndexViewModel(function() {});
		}
		else if (needsRefresh && isRefreshing) {
			console.log('needs a refresh, but alreadying waiting for a refresh');
		}

		// return the last cached copy
		console.log('returning cached index view model, age = %s', age);
		callback(_indexViewModelCache);
	}
}