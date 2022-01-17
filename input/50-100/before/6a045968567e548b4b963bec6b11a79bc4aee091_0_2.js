function getGistHtml(id, callback) {
		getGistMarkdown(id, function (gist, error) {
			if (!error) {
				var html = ghm.parse(gist.markdown);
				callback(gist.markdown, html);
			} else {
				callback(null, null, error);
			}
		});
    }