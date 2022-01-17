function (error, gist) {
			if (!error) {
				var firstFile = getFirstGistFile(gist);
				callback(null, { markdown: firstFile.content });
			}
			else {
				callback(error);
			}
		}