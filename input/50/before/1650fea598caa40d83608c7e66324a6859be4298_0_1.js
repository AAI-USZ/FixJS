function (list) {
					var data = JSON.stringify(list);
					res.writeHead(200, {
						'Content-Type': 'text/plain',
						'Content-Length': data.length
					});
					res.end(data);
				}