function(url, params, onresp, onerror) {

	var u = uri.parse(url);
	var opt = {
		headers: {},
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
	var binary;
	if (params) {
		if (params instanceof util.Binary) {
			opt.headers['Content-Type'] = 'application/octet-stream';
			opt.headers['Content-Length'] = params.bytes;
			binary = true;
		} else {
			if (typeof params === 'string') {
				body = params;
			} else {
				body = querystring.stringify(params);
			}
			opt.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			opt.headers['Content-Length'] = params.length;
		}
	}
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