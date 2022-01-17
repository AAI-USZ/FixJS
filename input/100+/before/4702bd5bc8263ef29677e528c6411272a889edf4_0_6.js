function(fileKey, filename, comment, text) {
		var d = $.Deferred();
		console.log('upload completing... getting token...');
		var that = this;
		this.requestEditToken().done(function(token) {
			var progress = 70;
			that.reportProgress( progress );
			console.log('.... got token');
			var progressTimeout = window.setInterval( function() {
				progress = progress < 100 ? progress + 1 : progress;
				that.reportProgress( progress );
			}, 500 );
			console.log('starting ajax upload completion...');
			that.request('POST', {
				action: 'upload',
				filekey: fileKey,
				filename: filename,
				comment: comment,
				text: text,
				token: token,
				ignorewarnings: 1
			}).done(function(data) {
				that.reportProgress( 100 );
				window.clearTimeout( progressTimeout );
				console.log(JSON.stringify(data));
				if (data.upload.result === 'Success') {
					d.resolve(data.upload.imageinfo);
				} else {
					d.reject("Upload did not succeed");
				}
			}).fail(function(xhr, error) {
				window.clearTimeout( progressTimeout );
				console.log("upload error source " + error.source);
				console.log("upload error target " + error.target);
				d.reject("HTTP error");
			});
		});
		return d.promise();
	}