function() {
									console.log(stdout);
									console.log(' writing ' + cached_file + ' to cache ');
									res.redirect( '/' + cached_file );
								}