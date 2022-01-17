function (gist, error) {
			if (!error) {
				var html = md(gist.markdown);
				callback(gist.markdown, html);
			} else {
				callback(null, null, error);
			}
		}