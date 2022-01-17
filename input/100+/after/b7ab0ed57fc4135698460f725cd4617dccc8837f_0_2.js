function (err, stats) {
		
		if (err) {
			notFound(res);
			return;
		}
		var type = mime.lookup(filename);
		
		var isCached = false;

		if (req.headers['if-modified-since'] && !skipCache) {
			var req_date = new Date(req.headers['if-modified-since']);
			if (stats.mtime <= req_date && req_date <= Date.now()) {
				res.writeHead(304, {
					'Last-Modified': stats.mtime
				});
				res.end();
				isCached = true;
			}
		}
		if (!isCached) {
			
			fs.readFile(filename, function (err, data) {
				if (err) {
					/*res.writeHead(404, {'Content-Type': 'text/plain'});
					res.end('404 Not found\r\n'+err);*/
					notFound(res);
				} else {
					var headers = {
						'Content-Type': type,
						'Content-Length': stats.size
					};
					if (!skipCache) {
						headers['Last-Modified'] = stats.mtime;
					}
					res.writeHead(200, headers);
					res.end(data);
				}
			});
		}
	}