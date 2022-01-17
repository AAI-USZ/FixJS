function im_callback(cb, err, stdout, stderr) {
	if (err)
		return cb(Muggle('Conversion error.', stderr || err));
	if (config.DEBUG)
		setTimeout(cb, 1000);
	else
		cb();
}