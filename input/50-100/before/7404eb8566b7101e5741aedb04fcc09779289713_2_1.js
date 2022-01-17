function(error, response, body) {
			if (!error && response.statusCode == 200) {
				log.info('200 from url (%s) - response headers: %s', post.raw_markdown_url, response.headers);

				// store the content in the post fields
				var markdown = body.toString();
				post.content_md = markdown;
				post.content_html = md(markdown);
				callback(null);
			} else {
				log.error('populateBlogPostContent: error for %s, error = %s', post.id, error);
				callback(error);
			}
		}