function( err, pass2result ) {
				if ( err ) {
					grunt.verbose.error();
					grunt.log.error( err );
					fileDone();
					return;
				}
				grunt.verbose.ok();

				var targetHTMLFileName = targetDir + path.basename( fileName );
				targetHTMLFileName = targetHTMLFileName.substr( 0, targetHTMLFileName.length - "xml".length ) + "html";

				grunt.verbose.write( "Pygmentizing " + targetHTMLFileName + "..." );
				pygmentize.file( pass2result, function( error, data ) {
					if ( error ) {
						grunt.verbose.error();
						grunt.log.error( error );
						fileDone();
						return;
					}
					grunt.verbose.ok();

					grunt.file.write( targetHTMLFileName, data );

					fileDone();
				});
			}