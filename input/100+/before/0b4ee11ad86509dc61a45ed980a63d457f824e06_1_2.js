function() {
	var task = this,
		taskDone = task.async(),
		files = this.data,
		targetDir = grunt.config( "wordpress.dir" ) + "/posts/page/";

	grunt.file.mkdir( targetDir );

	grunt.utils.async.forEachSeries( files, function( fileName, fileDone ) {
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

		grunt.verbose.write( "Pygmentizing " + targetFileName + "..." );
		pygmentize.file( targetFileName, function( error, data ) {
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
	}, function() {
		if ( task.errorCount ) {
			grunt.warn( "Task \"" + task.name + "\" failed." );
			taskDone();
			return;
		}
		grunt.log.writeln( "Built " + files.length + " pages." );
		taskDone();
	});
}