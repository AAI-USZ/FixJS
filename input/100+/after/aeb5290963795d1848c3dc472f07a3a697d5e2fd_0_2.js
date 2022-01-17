function uncompressFromURL() {

	var url = "http://10.42.0.1/test.zip";
	var targetName = "/test.zip";
    
    
    var uncompressFileEntry = function(fileEntry) {
        
        console.log(fileEntry);
        
        var localPath = fileEntry.fullPath;
        var zip = window.plugins.Zip;
        zip.uncompress(localPath, "/tmp", successListener, function () {
                       console.error('ERROR zip.uncompress()');
                       console.error(arguments);
                       });
    };

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {

		fileSystem.root.getFile(targetName, {create: true, exclusive: false}, function (fileEntry) {

			var localPath = fileEntry.fullPath;
			
			/*
			if (device.platform === "Android" && localPath.indexof("file://") === 0) {
				localPath = localPath.substring(7);
			}
			*/
	
			var fileTransfer = new FileTransfer();
	
			fileTransfer.download(
				url,
				localPath,
				function (entry) {
					console.log("download complete: " + entry.fullPath);
					console.log("+ info: " + entry);
                    uncompressFileEntry(fileEntry);
				},
				function (error) {
					console.log("download error source " + error.source);
					console.log("download error target " + error.target);
					console.log("upload error code" + error.code);
				}
			);
		}, fail);
	}, fail);	
}