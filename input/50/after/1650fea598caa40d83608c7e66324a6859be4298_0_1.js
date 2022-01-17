function (list) {
					var data = JSON.stringify(list);
					res.writeHead(200, {
						'Content-Type': 'text/plain'
					});
					res.end(data);
				}