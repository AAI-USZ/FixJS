function gotSharedViewMode(getSharedError, shared) {
			if (getSharedError) return callback(getSharedError);

			var viewModel = {
				posts: posts,
				shared: shared,
				title: 'Rarely updated'
			};

			callback(null, viewModel);
		}