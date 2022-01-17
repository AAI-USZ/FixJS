function(exists) {
				if (exists) {
					fs.stat(orig_img_path, function(err, orig_img_stats) {
						req.url = path.join(cache_dir, pathname.slice(1).replace(/\//g, '|')); //part cache url
						var image_dir = path.join(root, req.url);
						path.exists(image_dir, function(exists) {
							var image = '';
							if (req.query.w) { image += 'w'+req.query.w; }
							if (req.query.h) { image += 'h'+req.query.h; }
							if (req.query.c) { image += 'c'+req.query.c; }
							// путь до кэшированного изображения
							req.url = path.join(req.url, image + path.extname(pathname));
							var cache_img_path = path.join(root, req.url);
							req.url = encodeURI(req.url);
							if (!exists) {
								mkdirp(image_dir, function(err) {
									if (err) {
										console.log(err);
										next();
									} else { __imager(cache_img_path, orig_img_path, orig_img_stats, req, next); }
								});
							} else { __imager(cache_img_path, orig_img_path, orig_img_stats, req, next); }
						});
					});
				} else { next(); }
			}