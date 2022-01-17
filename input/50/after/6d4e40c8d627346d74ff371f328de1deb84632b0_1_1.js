function( manifest, fn ) {
		manifest.bugs = 5;
		fn( manifest, manifest.version, [
			"Invalid data type for bugs; must be a string."
		]);
	}