function (err) {
	var err_desc = 'Unknown image processing error.'
	if (err instanceof Muggle) {
		err_desc = err.most_precise_error_message();
		err = err.deepest_reason();
	}
	/* Don't bother logging PEBKAC errors */
	if (!(err instanceof Muggle))
		winston.error(err);

	if (this.resp) {
		this.resp.writeHead(500, {'Content-Type': 'text/plain'});
		this.resp.end(err_desc);
		this.resp = null;
	}
	if (!this.failed) {
		this.form_call('upload_error', err_desc);
		this.failed = true;
	}
	if (this.image) {
		var files = image_files(this.image);
		files.forEach(function (file) {
			fs.unlink(file, function (err) {
				if (err)
					winston.warn("Deleting " +
						file + ": " + err);
			});
		});
		this.db.track_temporaries(null, files, function (err) {
			if (err)
				winston.warn("Tracking failure: " + err);
		});
	}
	this.db.disconnect();
}