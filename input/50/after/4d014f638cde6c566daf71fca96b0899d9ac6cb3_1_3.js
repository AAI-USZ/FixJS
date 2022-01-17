function getFirstGistFile(gist) {
		if (!gist || !gist.files) throw new Error("gist is missing or has no enumerable files property");
		return gist.files[_(gist.files).keys()[0]];
	}