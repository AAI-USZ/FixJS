function(asyncError) {
			if (!asyncError) {
				callback(posts);
			} else {
				callback(null, asyncError);
			}
		}