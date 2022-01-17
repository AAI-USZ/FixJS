function (req, resp, board) {
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
		winston.error('formidable: ' + err);
		self.failure('Upload request problem.');
	});
	form.once('aborted', function (err) {
		self.failure('Upload was aborted.');
	});
	this.lastProgress = -1;
	form.on('field', function (key, value) {
		if (key == 'client_id')
			self.client_id = value;
	});
	form.on('progress', this.upload_progress_status.bind(this));

	try {
		form.parse(req, this.parse_form.bind(this));
	}
	catch (err) {
		winston.error('caught: ' + err);
		if (typeof err != 'string')
			err = 'Invalid request.';
		self.failure(err);
	}
}