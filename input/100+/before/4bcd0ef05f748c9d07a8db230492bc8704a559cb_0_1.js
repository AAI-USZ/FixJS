function (req, resp, board) {
	this.client_id = parseInt(req.query.id, 10);
	if (!this.client_id || this.client_id < 1)
		return this.failure(Muggle('Bad client ID.'));

	this.board = board;
	this.resp = resp;
	var len = parseInt(req.headers['content-length'], 10);
	if (len > 0 && len > config.IMAGE_FILESIZE_MAX + (20*1024))
		return this.failure('File is too large.');

	var form = new formidable.IncomingForm();
	form.uploadDir = config.MEDIA_DIRS.tmp;
	form.maxFieldsSize = 50 * 1024;
	form.hash = 'md5';
	form.onPart = function (part) {
		if (part.filename && part.name == 'image')
			form.handlePart(part);
		else if (!part.filename && validFields.indexOf(part.name) >= 0)
			form.handlePart(part);
	};
	var self = this;
	form.once('error', function (err) {
		self.failure(Muggle('Upload request problem.', err));
	});
	form.once('aborted', function (err) {
		self.failure(Muggle('Upload was aborted.', err));
	});
	this.lastProgress = 0;
	form.on('progress', this.upload_progress_status.bind(this));

	try {
		form.parse(req, this.parse_form.bind(this));
	}
	catch (err) {
		self.failure(err);
	}
}