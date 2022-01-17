function(err, res, body) {
				if(res.statusCode != 200)
					cb('Cannot load (status ' + res.statusCode + '): ' + entry.url);
				fs.writeFile(fname, body, null, _x(cb, true, function(err) {
					console.log(fname);
					cb();
				}));
			}