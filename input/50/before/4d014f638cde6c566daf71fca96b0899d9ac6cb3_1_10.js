function(gist, error) {
			if (!error) {
				var post = toBlogPost(gist);
				callback(post);
			} else {
				callback(null, error);
			}
		}