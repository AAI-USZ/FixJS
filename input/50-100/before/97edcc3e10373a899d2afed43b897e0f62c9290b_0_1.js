function (err, stdout, stderr) {
						if (err) {
							res.json(err,404);
						} else if (stderr) {
							res.json(stderr,404);
						} else {
							res.setHeader('Expires', new Date(Date.now() + 604800000));
							stdout.pipe( res );
						}
					}