function (fileSystem) {

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
				},
				function (error) {
					console.log("download error source " + error.source);
					console.log("download error target " + error.target);
					console.log("upload error code" + error.code);
				}
			);
		}, fail);
	}