function (error, gist) {
			if (!error) {
				var html = md(gist.markdown);
				callback(null, gist.markdown, html);
			} else {
				callback(error);
			}
		}