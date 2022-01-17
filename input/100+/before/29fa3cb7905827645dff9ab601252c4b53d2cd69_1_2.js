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