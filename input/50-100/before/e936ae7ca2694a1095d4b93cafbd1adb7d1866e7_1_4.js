function im_callback(cb, err, stdout, stderr) {
	if (err) {
		winston.error(stderr);
		return cb('Conversion error.');
	}
	if (config.DEBUG)
		setTimeout(cb, 1000);
	else
		cb();
}