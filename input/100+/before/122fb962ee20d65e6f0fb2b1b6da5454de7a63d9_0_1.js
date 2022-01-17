function( err, value ) {
				this.scale( value.width * 10, value.height * 10 );
				this.stream(function (err, stdout, stderr) {
					if (err) return next(err);
					res.setHeader('Expires', new Date(Date.now() + 604800000));
					stdout.pipe( res );
				});
			}