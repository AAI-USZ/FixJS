function sha1(data, encoding) {
	var hash = crypto.createHash('sha1');
	hash.update(data);
	if (!encoding || encoding === 'binary') {
		return new Buffer(hash.digest('base64'), 'base64');
	} else {
		return hash.digest(encoding);
	}
}