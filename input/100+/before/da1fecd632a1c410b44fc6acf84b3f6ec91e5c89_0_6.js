function(blob){
		var blob=blob;
		var fs_url=undefined;
		var deferred = $.Deferred(); 
		var promise = deferred.promise();

		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		window.URL = window.URL || window.webkitURL;


		function fs_errorHandler (e){
		var msg = '';
		  switch (e.code) {
		    case FileError.QUOTA_EXCEEDED_ERR:
		      msg = 'QUOTA_EXCEEDED_ERR';
		      break;
		    case FileError.NOT_FOUND_ERR:
		      msg = 'NOT_FOUND_ERR';
		      break;
		    case FileError.SECURITY_ERR:
		      msg = 'SECURITY_ERR';
		      break;
		    case FileError.INVALID_MODIFICATION_ERR:
		      msg = 'INVALID_MODIFICATION_ERR';
		      break;
		    case FileError.INVALID_STATE_ERR:
		      msg = 'INVALID_STATE_ERR';
		      break;
		    default:
		      msg = 'Unknown Error';
		      break;
		  };
		  console.log('Error: ' + msg);
		  deferred.reject(msg);
		}
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
		}//end of onInitFs

		window.requestFileSystem(window.TEMPORARY, 1024*1024 , onInitFs, fs_errorHandler);
		
		return promise;
	}