function(asyncError) {
					if (asyncError) { return callback(asyncError); }
					return callback(null, posts);
				}