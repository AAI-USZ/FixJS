function gotIndexViewModelData(err, results) {
			if (err) return callback(err);

			var viewModel = buildIndexViewModel(results.posts, results.shared);
			callback(err, viewModel);
		}