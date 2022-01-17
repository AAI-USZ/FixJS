function(err, res, body) {
				if(res.statusCode == 404) {
					console.log('Cannot load (status ' + res.statusCode + '): ' + entry.url);
					cb();
				}
				else if(res.statusCode != 200) {
					cb('Cannot load (status ' + res.statusCode + '): ' + entry.url);
				}
				else {
					fs.writeFile(fname, body, null, _x(cb, true, function(err) {
						console.log(fname);
						cb();
					}));
				}
			}