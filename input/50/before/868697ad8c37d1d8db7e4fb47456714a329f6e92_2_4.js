function onGotSharedViewModel (err, shared) {
		if (err) return callback(err);

		var model = buildAboutViewModel(shared);
		callback(null, model);
	}