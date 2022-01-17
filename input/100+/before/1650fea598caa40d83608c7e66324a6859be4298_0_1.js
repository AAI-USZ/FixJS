function (list) {
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
						}