function (err, data) {
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
			}