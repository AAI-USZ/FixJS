function getBlogPostsForUser(options, callback) {

		var getAllContents = options.allContents === true;
		var url = getApiUrlForUserName(options.username);

		requestJson(url, function (json, error) {
			
			var hasValidGistsList = json !== null && json.length > 0;

			if (!error && hasValidGistsList) {

				// convert the gists to our post format
				var posts = toBlogPosts(json);

				if (getAllContents) {
					// caller wants posts with full content
					asyncPopulateAllContentsForPosts(posts, function(postsWithContent, error){
						if (!error) {
							callback(postsWithContent);
						} else {
							log('getBlogPostsForUser: got asyncError %s', asyncError);
							callback(null, error);
						}
					});
				} else {
					// caller wants posts without full content, give it now
					callback(posts);
				}
			}
			else {
				// Error
				if (json !== null && !hasValidGistsList) {
					log('getBlogPostsForUser: got an empty gist list');
				}
				else {
					log('getBlogPostsForUser: error getting gists for user [%s], %s', options.username, error);
				}
				callback(null, error);
			}
		});
	}