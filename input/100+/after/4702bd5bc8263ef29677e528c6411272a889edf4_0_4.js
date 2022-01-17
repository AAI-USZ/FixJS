function( sourceUri, filename ) {
		var d = $.Deferred();
		var that = this;
		that.reportProgress( 0 );
		that.requestEditToken().done(function(token) {
			console.log( 'got token', token );
			that.reportProgress( 10 );
			var options = new FileUploadOptions();
			options.fileKey = 'file';
			options.fileName = filename;
			//options.fileName = filename;
			options.mimeType = "image/jpg";
			options.chunkedMode = false;
			options.params = {
				action: 'upload',
				filename: filename,
				ignorewarnings: 1,
				stash: 1,
				progress: true,
				token: token,
				format: 'json'
			};

			var ft = new FileTransfer();
			function uploadSuccess( r ) {
				// success
				console.log("Code = " + r.responseCode);
				console.log("Response = " + r.response);
				console.log("Sent = " + r.bytesSent);
				var data = JSON.parse(r.response);
				if( data.error ) {
					d.reject( data );
				} else if ( data && data.upload && data.upload.result === 'Success' ) {
					d.resolve( data.upload.filekey, token );
				} else {
					d.reject(data);
				}
			}
			function uploadFail( error ) {
				console.log("upload error source " + error.source);
				console.log("upload error target " + error.target);
				console.log(JSON.stringify(error));
				d.reject("HTTP error");
			}
			
			window.resolveLocalFileSystemURI( sourceUri, function( fileEntry ) {
				fileEntry.file( function( file ) {
					ft.upload( sourceUri, that.url, function( r ) {
						var percentageSent, sent;
						if( r && r.responseCode === -1 ) {
							sent = r.bytesSent || 0;
							percentageSent = sent / file.size * 100;
							that.reportProgress( Math.round( percentageSent / 2 ) + 10 );
						} else {
							uploadSuccess( r );
						}
					}, uploadFail, options );
				} );
			});
		});
		return d.promise();
	}