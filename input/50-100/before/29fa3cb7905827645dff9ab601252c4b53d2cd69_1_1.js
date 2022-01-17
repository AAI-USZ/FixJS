function(error, response, body) {
			if (!error && response.statusCode == 200) {
				// store the content in the post fields
				var markdown = body.toString();
				post.content_md = markdown;
				post.content_html = md(markdown);
				callback();
			} else {
				log('populateBlogPostContent: error for %s, error = %s', post.id, error);
				callback(error);
			}
		}