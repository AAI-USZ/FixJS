function httpGetParsedFile(filename, req, res, skipCache, type) {
	fs.stat(filename, function (err, stats) {
		
		if (err) {
			notFound(res);
			return;
		}
		
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
			
			fs.readFile(filename, function (err, file) {

				if (err) {
					notFound(res);
					return;
				}
				
				var headers = {
					//'content-type': 'application/octet-stream'
				};

				var streams = new Array(4);
				var loaded = 0;
				var totalSize = 262;
				var offset = 262;
				for (var i = 0; i < 4; i++) {
					var size = file.readUInt32LE(230+i*8);
					zlib.inflate(file.slice(offset, offset+size), inflateCallback(i));
					offset += size;
				}

				function inflateCallback(i) {
					return function (err, data) {
						streams[i] = data;
						totalSize += data.length;
						loaded++;
						if (loaded === 4) {
							
							var outputBuffer = new Buffer(totalSize);
							
							file.copy(outputBuffer, 0, 0, 262);
							var offset = 262;
							for (var j = 0; j < 4; j++) {
								streams[j].copy(outputBuffer, offset);
								offset += streams[j].length;
							}
							var acceptEncoding = req.headers['accept-encoding'];
							if (!acceptEncoding) {
								acceptEncoding = [];
							} else {
								acceptEncoding = acceptEncoding.split(",");
							}

							headers['X-Total-Content-Length'] = outputBuffer.length;

							if (acceptEncoding.indexOf('deflate')) {
								 headers['Content-Encoding'] = 'deflate';
								 zlib.deflate(outputBuffer, compressCallback);
							} else if (acceptEncoding.indexOf('gzip')) {
								 headers['Content-Encoding'] = 'gzip';
								 zlib.gzip(outputBuffer, compressCallback);
							} else {
								compressCallback(null, outputBuffer);
							}

							
						}
					};
				};
				
				function compressCallback(err, data) {
					if (err) {
						notFound(res);
						return;
					}
					headers['Content-Length'] = data.length;
					if (!skipCache) {
						headers['Last-Modified'] = stats.mtime;
					}
					
					res.writeHead(200, headers);
					res.end(data);
				};

			});
		}
	});
}