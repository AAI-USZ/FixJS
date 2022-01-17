function(posts, error) {
		if (error) {
			callback(null, error);
		} else {
			var viewModel = { 
				posts: posts,
				shared: getSharedViewModel('home'),
				title: 'Rarely updated' 
			};

			callback(viewModel);
		}
	}