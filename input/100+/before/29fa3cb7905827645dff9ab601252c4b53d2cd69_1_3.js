function() {

	var apiRootUrl = 'https://api.github.com/'
		, apiGistsFolder = 'gists/'
		, apiUsersFolder = 'users/'
		, log = console.log
		, logDebug = function() {} // console.log
	;

	function Constructor() {
	}

	function getApiUrlForUserName(username) {
		return apiRootUrl + apiUsersFolder + username + '/gists';
	}

	function getApiUrlForGistId(id) {
		return apiRootUrl + apiGistsFolder + id;
	}

	function getLocalBlogPostUrlForGist(gist) {
		return '/posts/' + gist.id; 
	}

	function date(gist) {
		return gist.created_at;
	}

	function getFirstGistFile(gist) {
		return gist.files[_(gist.files).keys()[0]];
	}

	function isBlogGist(gist) {
		var firstGistFile = getFirstGistFile(gist);
		var fileName = firstGistFile.filename;
		return /blog_.+\.md/.test(fileName);
	}

	function getGistHtml(id, callback) {
		getGistMarkdown(id, function (gist, error) {
			if (!error) {
				var html = md(gist.markdown);
				callback(gist.markdown, html);
			} else {
				callback(null, null, error);
			}
		});
	}

	function getGistMarkdown(id, callback) {
		getGist(id, function (gist, error) {
			if (!error) {
				var firstFile = getFirstGistFile(gist);
				callback({ markdown: firstFile.content });
			}
			else {
				callback(null, error);
			}
		});
	}

	function getGist(id, callback) {
		var url = getApiUrlForGistId(id);
		requestJson(url, function (json, error) {
			if (!error) {
				callback(json);
			}
			else {
				callback(null, error);
			}
		});
	}

	function populateBlogPostContent(post, callback) {
		logDebug('requesting raw markdown from %s', post.raw_markdown_url);
		request({url: post.raw_markdown_url}, function(error, response, body) {
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
		});
	}

	function asyncPopulateAllContentsForPosts(posts, callback) {
		async.forEach(posts, populateBlogPostContent, function(asyncError) {
			if (!asyncError) {
				callback(posts);
			} else {
				callback(null, asyncError);
			}
		});
	}

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

	function toBlogPosts(gists) {
		return _.chain(gists)
			.filter(isBlogGist)
			.map(toBlogPost)
			.sortBy(date)
			.value().reverse()
	}

	function toBlogPost(gist) {
		var firstGistFile = getFirstGistFile(gist);
		var hasContent = firstGistFile.content !== undefined;
		return { 
			id: gist.id,
			title: gist.description, 
			date: new Date(gist.created_at),
			comment_count: gist.comments,
			content_md: hasContent ? firstGistFile.content : null,
			content_html: hasContent ? md(firstGistFile.content) : null,
			url: getLocalBlogPostUrlForGist(gist),
			gist_url: gist.html_url,
			raw_markdown_url: firstGistFile.raw_url 
		};
	}

	function getBlogPost(id, callback) {
		getGist(id, function(gist, error) {
			if (!error) {
				var post = toBlogPost(gist);
				callback(post);
			} else {
				callback(null, error);
			}
		});
	}

	function requestJson(url, callback) {
		logDebug('requesting from %s', url);
		request({url: url, json: true}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				// console.log(JSON.stringify(body));
				callback(body);
			}
			else {
				log("error getting JSON from %s: error: %s, statusCode: %s", url, error, response.statusCode);
				callback(null, response.statusCode);
			}
		});
	}

	Constructor.prototype = {
		getBlogPostsForUser: getBlogPostsForUser
		, getBlogPost: getBlogPost
		, getGistMarkdown: getGistMarkdown
		, getGistHtml: getGistHtml
		, requestJson: requestJson
	};

	return Constructor;
}