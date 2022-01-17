function getFirstGistFile(gist) {
		return gist.files[_(gist.files).keys()[0]];
	}