function (err, fields, files) {
	if (err) {
		winston.error("Upload error: " + err);
		return this.failure('Invalid upload.');
	}
	if (!files.image)
		return this.failure('No image.');
	this.image = files.image;
	this.client_id = fields.client_id;
	this.pinky = !!parseInt(fields.op, 10);

	var spoiler = parseInt(fields.spoiler, 10);
	if (spoiler) {
		var sps = config.SPOILER_IMAGES;
		if (sps.normal.indexOf(spoiler) < 0
				&& sps.trans.indexOf(spoiler) < 0)
			return this.failure('Bad spoiler.');
		this.image.spoiler = spoiler;
	}

	this.image.MD5 = squish_MD5(this.image.hash);
	this.image.hash = null;

	this.db.track_temporaries([this.image.path], null,
			this.process.bind(this));
}