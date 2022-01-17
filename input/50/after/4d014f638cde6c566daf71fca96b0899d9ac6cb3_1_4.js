function isBlogGist(gist) {
		if (!gist || !gist.files) throw new Error("gist is missing or has no enumerable files property");
		var firstGistFile = getFirstGistFile(gist);
		var fileName = firstGistFile.filename;
		return (/blog_.+\.md/).test(fileName);
	}