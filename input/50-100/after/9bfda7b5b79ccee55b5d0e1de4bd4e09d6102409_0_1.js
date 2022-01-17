function(err, data) {
						if(err) {
							console.log(err);
							res.send(404);
							return;
						}
						var type = mime.lookup(url, 'application/octet-stream');
						res.contentType(type);
						res.send(data);
					}