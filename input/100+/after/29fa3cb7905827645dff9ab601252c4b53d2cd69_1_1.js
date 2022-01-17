function (error, json) {
			
			if (error) {
				// Error
				log('getBlogPostsForUser: error getting gists for user [%s], %s', options.username, error);
				callback(error);
			} else {
				var hasValidGistsList = json !== null && json.length > 0;
				if (!hasValidGistsList) {
					log('getBlogPostsForUser: got an empty gist list');
					callback(new Error("empty gist list"));
				} else {
					// convert the gists to our post format
					var posts = toBlogPosts(json);

					if (getAllContents) {
						// caller wants posts with full content
						asyncPopulateAllContentsForPosts(posts, function(error, postsWithContent){

							if (!error) {
								callback(null, postsWithContent);
							} else {
								log('getBlogPostsForUser: got asyncError %s', asyncError);
								callback(error);
							}
						});
					} else {
						// caller wants posts without full content, give it now
						callback(null, posts);
					}
				}
			}
		}