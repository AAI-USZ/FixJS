function() {
		if(Ti.Platform.osname === 'android') {
			var newDirectory = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory, 'newDir');
			newDirectory.createDirectory();
		
			var newFile = Ti.Filesystem.getFile(newDirectory.getNativePath(), 'this-file-exists.js');
			newFile.write("testing a file");
		
			var appDataFileDoesNotExist = Ti.Filesystem.getFile(newDirectory.getNativePath(), 'this-file-does-not-exist.js');
		
			valueOf(newDirectory.isDirectory()).shouldBeTrue();
			valueOf(newDirectory.exists()).shouldBeTrue();
			valueOf(newFile.exists()).shouldBeTrue();
			valueOf(appDataFileDoesNotExist.exists()).shouldBeFalse();
		}
	}