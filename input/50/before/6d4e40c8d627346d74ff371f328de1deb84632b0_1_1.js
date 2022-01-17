function( manifest, fn ) {
		manifest.maintainers = "John";
		fn( manifest, manifest.version, [
			"Invalid data type for maintainers; must be an array."
		]);
	}