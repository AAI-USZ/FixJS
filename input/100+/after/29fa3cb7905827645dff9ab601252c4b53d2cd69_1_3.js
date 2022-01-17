function() {

	var apiRootUrl = 'https://api.github.com/',
		apiGistsFolder = 'gists/',
		apiUsersFolder = 'users/',
		log = console.log,
		logDebug = function() {} // console.log
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
		if (!gist || !gist.date || !_.isDate(gist.date)) throw new Error("the gist must have a date property of type date");
		return gist.created_at;
	}

	function getFirstGistFile(gist) {
		if (!gist || !gist.files) throw new Error("gist is missing or has no enumerable files property");
		return gist.files[_(gist.files).keys()[0]];
	}

	function isBlogGist(gist) {
		if (!gist || !gist.files) throw new Error("gist is missing or has no enumerable files property");
		var firstGistFile = getFirstGistFile(gist);
		var fileName = firstGistFile.filename;
		return (/blog_.+\.md/).test(fileName);
	}

	function getGistHtml(id, callback) {
		getGistMarkdown(id, function (error, gist) {
			if (!error) {
				var html = md(gist.markdown);
				callback(null, gist.markdown, html);
			} else {
				callback(error);
			}
		});
	}

	function getGistMarkdown(id, callback) {
		getGist(id, function (error, gist) {
			if (!error) {
				var firstFile = getFirstGistFile(gist);
				callback(null, { markdown: firstFile.content });
			}
			else {
				callback(error);
			}
		});
	}

	function getGist(id, callback) {
		var url = getApiUrlForGistId(id);
		requestJson(url, function (error, json) {
			if (!error) {
				callback(null, json);
			}
			else {
				callback(error);
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
				callback(null);
			} else {
				log('populateBlogPostContent: error for %s, error = %s', post.id, error);
				callback(error);
			}
		});
	}

	function asyncPopulateAllContentsForPosts(posts, callback) {
		async.forEach(posts, populateBlogPostContent, function(asyncError) {
			if (!asyncError) {
				callback(null, posts);
			} else {
				callback(asyncError);
			}
		});
	}

	function getBlogPostsForUser(options, callback) {

		var getAllContents = options.allContents === true;
		var url = getApiUrlForUserName(options.username);

		requestJson(url, function (error, json) {
			
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
		});
	}

	function toBlogPosts(gists) {
		return _.chain(gists)
			.filter(isBlogGist)
			.map(toBlogPost)
			.sortBy(date)
			.value().reverse();
	}

	function toBlogPost(gist) {
		var firstGistFile = getFirstGistFile(gist);
		var hasContent = firstGistFile.content ? true : false;
		return {
			id: Number(gist.id),
			title: gist.description,
			date: new Date(gist.created_at),
			comment_count: gist.comments,
			content_md: firstGistFile.content || null,
			content_html: hasContent ? md(firstGistFile.content) : null,
			url: getLocalBlogPostUrlForGist(gist),
			gist_url: gist.html_url,
			raw_markdown_url: firstGistFile.raw_url
		};
	}

	function getBlogPost(id, callback) {
		getGist(id, function(error, gist) {
			if (!error) {
				var post = toBlogPost(gist);
				callback(null, post);
			} else {
				callback(error);
			}
		});
	}

	function requestJson(url, callback) {
		logDebug('requesting from %s', url);
		request({url: url, json: true}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				callback(null, body);
			}
			else {
				log("error getting JSON from %s: error: %s, statusCode: %s", url, error, response.statusCode);
				callback(response.statusCode);
			}
		});
	}

	Constructor.prototype = {
		getBlogPostsForUser: getBlogPostsForUser,
		getBlogPost: getBlogPost,
		getGistMarkdown: getGistMarkdown,
		getGistHtml: getGistHtml,
		requestJson: requestJson
	};

	return Constructor;
}