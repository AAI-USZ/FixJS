function(error, gist) {
			if (!error) {
				var post = toBlogPost(gist);
				callback(null, post);
			} else {
				callback(error);
			}
		}