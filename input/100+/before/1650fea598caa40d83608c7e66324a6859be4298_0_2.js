function (req, res) {
		
		var username = "";

		var isLoggedIn = false;

		if (req.headers.authorization) {
			var details = new Buffer(req.headers.authorization.split(" ")[1], 'base64').toString('utf8').split(':');
			if (details[0].length > 0 && (settings.server.password.length === 0 || details[1] === settings.server.password)) {
				isLoggedIn = true;
				username = details[0];
			}
		}

		if (!isLoggedIn) {
			res.writeHead(401, {
				'WWW-Authenticate': 'Basic realm="WebJCS"',
				'Content-Type':     'text/plain'
			});
			res.end('401 Unauthorized');
			return;
		}
		
		var uri = url.parse(req.url, true);

		if (uri.pathname.indexOf('/node/') === 0) {
			switch (uri.pathname.substr(6)) {


				case 'info':
				var data = JSON.stringify({
					server: {
						collaboration: settings.server.collaboration
					},
					paths: {
						merge_folders: settings.paths.merge_folders
					}
				});
				res.writeHead(200, {
					'Content-Type': 'text/plain',
					'Content-Length': data.length
				});
				res.end(data);
				break;


				case 'files/list':
				getFileList(settings.paths.merge_folders, function (list) {
					var data = JSON.stringify(list);
					res.writeHead(200, {
						'Content-Type': 'text/plain',
						'Content-Length': data.length
					});
					res.end(data);
				});
				break;

				case 'files/get':
				if (typeof uri.query.n !== 'undefined' && uri.query.n.length > 0) {
					if (settings.paths.merge_folders) {
						getFileList(false, function (list) {
							var filename = "";
							for (var f = 0; f < settings.paths.folders.length; f++) {
								var files = list[settings.paths.folders[f]];
								if (files.indexOf(uri.query.n) !== -1) {
									filename = path.join(settings.paths.folders[f], uri.query.n);
									break;
								}
							}
							if (filename.length > 0) {
								httpGetFile(filename, req, res);
							} else {
								notFound(res);
							}
						});
					} else if (typeof uri.query.f !== 'undefined') {
						var filename = path.join(settings.paths.folders[+uri.query.f || 0], uri.query.n);
						httpGetFile(filename, req, res);
					} else {
						notFound(res);
					}
					
				} else {
					notFound(res);
				}
				break;


				default:
				notFound(res);
				break;

			}
			return;
		}

		var filename = path.join(__dirname, './static/', uri.pathname);

		if (filename.substr(-1) === "/") {
			filename += "index.html";
		}
		httpGetFile(filename, req, res);
		
	}