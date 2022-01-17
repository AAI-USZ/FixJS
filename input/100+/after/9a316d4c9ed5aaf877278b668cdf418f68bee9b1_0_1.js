function() {

	// TODO: come up with a better way of caching/refreshing?
	var _indexViewModelCache = { 
		posts: [],
		homeNavClasses: 'active',
		aboutNavClasses: '',
		title: 'Rarely updated' 
	};

	var lastGet = new Date(2000, 1, 1);
	var isRefreshingIndexViewModel = false;
	var getOptions = {username:'adamchester', allContents: true};

	function refreshIndexViewModel(callback) {

		console.log('getting latest data from github: %s', JSON.stringify(getOptions));
		isRefreshingIndexViewModel = true;

		gists.getBlogPostsForUser(getOptions, function(posts) {
			lastGet = new Date();
			_indexViewModelCache.posts = posts;
			isRefreshingIndexViewModel = false;
			callback(_indexViewModelCache);
		});
	}

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

	function getPostViewModel(req, callback) {
		getIndexViewModel(function(indexViewModel) {

			// find the post in the index view model cache
			var post = _.chain(indexViewModel.posts)
				.filter(function(post) { return post.id === req.params.id})
				.first()
				.value();

			callback(post);
		});
	}

	this.index = function(req, res) {
		getIndexViewModel(function(indexViewModel) {
			res.render('index', indexViewModel);
		});
	};

	this.post = function(req, res) {
		getPostViewModel(req, function(post) {
			res.render('post', { title: post.title, post: post, homeNavClasses: '', aboutNavClasses: '' });
		});
	};
}