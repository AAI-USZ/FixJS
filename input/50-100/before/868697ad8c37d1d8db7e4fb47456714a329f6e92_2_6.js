function onGotAsyncData(err, results) {
			if (err) return callback(err);

			var viewModel = buildPostViewModel(postId, results.index, results.shared);

			if (!viewModel.post) {
				return callback(new NotFoundError("Unable to find post with id " + postId));
			}

			callback(err, viewModel);
		}