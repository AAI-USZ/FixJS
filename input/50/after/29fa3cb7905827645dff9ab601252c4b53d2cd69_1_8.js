function(asyncError) {
			if (!asyncError) {
				callback(null, posts);
			} else {
				callback(asyncError);
			}
		}