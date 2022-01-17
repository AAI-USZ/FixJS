function( fileName, fileDone ) {
		var targetFileName = targetDir + fileName.replace( /^.+?\//, "" );

		grunt.verbose.write( "Processing " + fileName + "..." );
		grunt.file.copy( fileName, targetFileName, {
			process: function( content ) {
				return content.replace(/@partial\((.+)\)/g, function(match, input) {
					return htmlEscape( grunt.file.read( input ) );
				});
			}
		});

		if ( grunt.option( "nohighlight" ) ) {
			fileDone();
			return;
		}

		grunt.verbose.write( "Syntax highlighting " + targetFileName + "..." );
		grunt.helper("syntax-highlight", {file: targetFileName, target: targetFileName}, function( error, data ) {
			if ( error ) {
				grunt.verbose.error();
				grunt.log.error( error );
				fileDone();
				return;
			}
			grunt.verbose.ok();

			grunt.file.write( targetFileName, data );

			fileDone();
		});
	}