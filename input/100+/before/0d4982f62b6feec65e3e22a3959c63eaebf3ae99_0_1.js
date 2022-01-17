function(template, data, options, callback) {

		// if no options passed, fix params
		if (_.isFunction(options) && !callback) {
			callback = options // options is callback
			options = _.extend({}, defaults); // no options passed, use defaults

		// mix passed in options into defaults, copy to new object
		} else {
			options = _.extend({}, defaults, options);
		}

		// load template from file system
		var http_text = _.template(
		fs.readFileSync(basePath + template + '.http', 'utf-8').toString(), data, {
			interpolate: /\{\{(.+?)\}\}/g
		});

		//parse first line
		var lines = http_text.split(/\n/);
		var matches = lines[0].match(/^([A-Za-z]+)\s+([\/0-9A-Za-z_&?=\-%+]+)\s+HTTP.+$/);
		var method = matches[1];
		var path = matches[2];
		lines.shift();

		// read all the headers
		var host, body = '', headers = {};
		_.each(lines, function(line) {
			
			if (line.length > 0) {

				var matches = line.match(/([-A-Za-z]+):\s+(.+)$/);
				if (matches) {

					var k = matches[1];
					var v = matches[2];

					if (k.toUpperCase() === "HOST") {
						host = v;
					}
					headers[k] = v;

				} else {
					body += line;
				}
				
			} else {
				return;
			}
		});

		// send request
		var proto = options.https ? https : http;
		console.log(headers);
		var req = proto.request({ 
			host: host,
			port: '443',
			path: path, 
			method: method,
			headers: headers }, 
			function(res) {
				var buffers = [];

				// set up pipe for response data, gzip or plain based on respone header
				var stream = res.headers['content-encoding'] && res.headers['content-encoding'].match(/gzip/) ?
					res.pipe(zlib.createGunzip()) : res;

				stream.on('data', function(chunk) {
					buffers.push(chunk);
				}).on('end', function() {
					callback(res, Buffer.concat(buffers).toString());
				});
		});
		if (body.length) {
			req.write(body);
		}
		req.end();
	}