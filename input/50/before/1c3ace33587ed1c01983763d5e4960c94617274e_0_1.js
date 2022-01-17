function attempt(aPath) {
		if (foundPath) { return }
		if (path.existsSync(aPath)) { foundPath = aPath }
	}