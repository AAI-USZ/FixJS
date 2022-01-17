function (list) {
							
							var filename = "";
							for (var f = 0; f < settings.paths.folders.length; f++) {
								var files = list[settings.paths.folders[f]];
								for (var i = 0; i < files.length; i++) {
									if (files[i][0] === uri.query.n) {
										filename = path.join(settings.paths.folders[f], uri.query.n);
										break;
									}
									if (filename.length > 0) {
										break;
									}
								}
								
							}

							if (filename.length > 0) {
								httpGetFile(filename, req, res);
							} else {
								notFound(res);
							}
						}