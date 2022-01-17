function() {
		fs.copyTree(phantom.libraryPath, TEST_DIR);
		expect(fs.list(phantom.libraryPath).length).toEqual(fs.list(TEST_DIR).length);
		fs.removeTree(TEST_DIR);
	}