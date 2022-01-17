function attempt(aPath) {
		if (foundPath) { return }
		if (fs.existsSync(aPath)) { foundPath = aPath }
	}