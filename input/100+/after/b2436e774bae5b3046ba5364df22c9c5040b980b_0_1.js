function(url, params, onresp, onerror) {

	var u = uri.parse(url);
	var opt = {
		headers: {'Accept': 'application/json', 'Accept-Encoding': 'gzip, deflate'},
		host: u.hostname,
		port: u.port,
		path: u.path,
		method: 'POST'
	};

	var proto;
	if (u.protocol == 'https:') {
		proto = https;
	} else {
		proto = http;
	}

	var body;
	var binary = false;
    var contentLength = 0;
	var contentType = 'application/x-www-form-urlencoded';
	if (params) {
		if (params instanceof util.Binary) {
			contentType = 'application/octet-stream';
			contentLength = params.bytes;
			binary = true;
		} else {
			if (typeof params === 'string') {
				body = params;
			} else {
				body = querystring.stringify(params);
			}
			contentLength = params.length;
		}
	}
    opt.headers['Content-Type'] = contentType;
    opt.headers['Content-Length'] = contentLength;

	this.auth(opt, body);

	var req = proto.request(opt, onresp);
	req.on('error', onerror);

	if (params) {
		if (binary) {
			params.stream.pipe(req);
		} else {
			req.write(params);
		}
	}
	req.end();
}