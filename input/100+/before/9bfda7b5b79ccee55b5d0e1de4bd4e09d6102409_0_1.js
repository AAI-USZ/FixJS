function(err, stat) {
				if(err) {
					res.send(404);
					return;
				}
				if(stat.isDirectory()) {
					if(req.url.lastIndexOf('/') !== req.url.length-1) {
						res.redirect(req.url+'/');
						return;
					}
					fs.readdir(folder+req.url, function(err, files) {
						var html = '<ul>';
						html += '<li><a href="../">../</a></li>'
						for(var i = 0, len = files.length; i < len; i++) {
							html += '<li><a href="'+files[i]+'/">'+files[i]+'</a></li>'
						}
						res.send(html+'</ul>');
					});
				} else {
					var url = folder+req.url;
					if(url.lastIndexOf('/') === url.length-1) {
						res.redirect(req.url.substring(0, req.url.lastIndexOf('/')));
						return;
					}
					fs.readFile(url, function(err, data) {
						if(err) {
							res.send(404);
							return;
						}
						var type = mime.lookup(url, 'application/octet-stream');
						res.contentType(type);
						res.send(data);
					});
				}
			}