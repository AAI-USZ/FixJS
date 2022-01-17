function( err, value ) {
					if( err ) {
						res.json(err,404);
					} else {
						this.scale( value.width * 10, value.height * 10 );
						this.stream(function (err, stdout, stderr) {
							stderr.on('data',function(data){console.log('stderr',data)});
							if (err) {
								res.json(err,404);
							} else {
							    var writeStream = fs.createWriteStream( cached_file );
								stdout.pipe( writeStream );
								stdout.on('end', function() {
									console.log(stdout);
									console.log(' writing ' + cached_file + ' to cache ');
									res.redirect( '/' + cached_file );
								});
							}
						});
					}
				}