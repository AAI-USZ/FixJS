function() {
		var phantomLibraryPathListingLength = fs.list(phantom.libraryPath).length;
		fs.copyTree(phantom.libraryPath, "/tmp/"+TEST_DIR);
		expect(phantomLibraryPathListingLength === fs.list("/tmp/"+TEST_DIR).length);
		fs.removeTree("/tmp/"+TEST_DIR);
	}