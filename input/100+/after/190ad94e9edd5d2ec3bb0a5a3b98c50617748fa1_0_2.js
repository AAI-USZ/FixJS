function instrumentFile (file, basePath, callback, options) {
	var fileName = path.join(basePath, file);
	var osIndependentName = osIndependentFileName(fileName);
	
	var encoding = "utf-8";
	var content = fs.readFileSync(fileName, encoding);

	var instructed = instrument(osIndependentName, content, options).clientCode;
	if (instructed === content) {
		instructed = fs.readFileSync(fileName);
		encoding = null;
	}

	if (callback) {
		callback.call(null, osIndependentName, instructed, encoding);
	}
}