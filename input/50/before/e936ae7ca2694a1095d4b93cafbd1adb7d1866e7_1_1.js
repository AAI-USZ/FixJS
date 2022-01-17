function (err) {
		winston.error('formidable: ' + err);
		self.failure('Upload request problem.');
	}