function (gist, error) {
			if (!error) {
				var firstFile = getFirstGistFile(gist);
				callback({ markdown: firstFile.content });
			}
			else {
				callback(null, error);
			}
		}