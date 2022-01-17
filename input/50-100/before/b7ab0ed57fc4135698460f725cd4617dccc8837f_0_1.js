function (err, data) {
				if (err) {
					/*res.writeHead(404, {'Content-Type': 'text/plain'});
					res.end('404 Not found\r\n'+err);*/
					notFound(res);
				} else {
					res.writeHead(200, {
						'Content-Type': type,
						'Content-Length': stats.size,
						'Last-Modified': stats.mtime
					});
					res.end(data);
				}
			}