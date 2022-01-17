function onInitFs(fs) {
  			console.log('Opened file system: ' + fs.name);
			fs.root.getFile('test.mp3', {create: true}, function(fileEntry) {
		    // Create a FileWriter object for our FileEntry (test.mp3).
		    fileEntry.createWriter(function(fileWriter) {

		      fileWriter.onwriteend = function(e) {
		        console.log('Write completed.');
		        var fs_url=fileEntry.toURL();
		        deferred.resolve(fs_url);
		      };
		      fileWriter.onerror = function(e) {
		        console.log('Write failed: ' + e.toString());
		        deferred.reject(e.toString());
		      };
		      // Create a new Blob and write it to log.txt.
		      fileWriter.write(blob);

    		}, fs_errorHandler);//end of createWriter
  		}, fs_errorHandler);//end of get root
		}