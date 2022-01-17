function( err, value ) {
					if( err ) {
						res.json(err,404);
					} else {
						this.scale( value.width * 5, value.height * 5 );
						this.stream(function (err, stdout, stderr) {
							if (err) {
								res.json(err,404);
							} else {
							    var writeStream = fs.createWriteStream( cached_file );
								stdout.pipe( writeStream );
								stdout.on('end', function() {
									console.log(' writing ' + cached_file + ' to cache ');
									res.redirect( '/' + cached_file );
								});
							}
						});
					}
				}