function (req, res, next) {
	var path = decodeURIComponent( req.params.path ) || false;
	if( path.match( /^https?:\/\// ) ) {
		imageMagick( path )
			.quality(100)
			.antialias(false)
			.size( function( err, value ) {
				if( err ) {
					res.json(err,404);
				} else {
					this.scale( value.width * 10, value.height * 10 );
					this.stream(function (err, stdout, stderr) {
						if (err) {
							res.json(err,404);
						} else {
							res.setHeader('Expires', new Date(Date.now() + 604800000));
							stdout.pipe( res );
						}
					});
				}
			});
	} else {
		res.json( "LOL whut?", 404 );
	}
}