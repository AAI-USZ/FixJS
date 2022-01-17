function isBlogGist(gist) {
		var firstGistFile = getFirstGistFile(gist);
		var fileName = firstGistFile.filename;
		return /blog_.+\.md/.test(fileName);
	}