function (req, res, next) {
	var path = decodeURIComponent( req.params.path ) || false;
	console.log( 'about to get ' + path );
	if( path.match( /^https?:\/\// ) ) {
		imageMagick( path )
			.quality(100)
			.antialias(false)
			.size( function( err, value ) {
				this.scale( value.width * 10, value.height * 10 );
				this.stream(function (err, stdout, stderr) {
					if (err) return next(err);
					res.setHeader('Expires', new Date(Date.now() + 604800000));
					stdout.pipe( res );
				});
			});
	} else {
		res.send( "LOL whut?", 404 );
	}
}