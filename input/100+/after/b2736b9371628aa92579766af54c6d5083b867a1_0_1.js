function (req, res) {

	// Read file content
	var content = fs.readFileSync("../../src/assets/" + req.params.file),

	// File extension
		ext = req.params.file.split(".").pop();
	
	// Return when file not exists
	if (!content) { return }
	
	res.header("Content-Type", {
		"png": "image/png",
		"gif": "image/gif",
		"jpg": "image/jpeg",
		"jpeg": "image/jpeg",
		"html": "text/html",
		"css": "text/css",
		"js": "text/javascript",
		"svg": "image/svg+xml",
		"svgz": "image/svg+xml",
		"eot": "application/vnd.ms-fontobject",
		"ttf": "application/x-font-ttf",
		"ttc": "application/x-font-ttf",
		"otf": "font/opentype",
		"woff": "application/x-font-woff",
		"undefined": "text/plain"
	}[ext]);

	res.header("Access-Control-Allow-Origin", "*");

	res.send(content);	
}