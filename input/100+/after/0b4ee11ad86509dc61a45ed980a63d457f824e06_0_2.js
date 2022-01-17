function() {
	var task = this,
		taskDone = task.async(),
		files = this.data,
		// TODO make `entry` a custom post type instead of (ab)using `post`?
		targetDir = grunt.config( "wordpress.dir" ) + "/posts/post/";

	grunt.file.mkdir( targetDir );

	grunt.utils.async.forEachSeries( files, function( fileName, fileDone ) {
		grunt.verbose.write( "Transforming (pass 1: preproc-xinclude.xsl) " + fileName + "..." );
		grunt.utils.spawn({
			cmd: "xsltproc",
			args: [ "preproc-xinclude.xsl", fileName ]
		}, function( err, pass1result ) {
			if ( err ) {
				grunt.verbose.error();
				grunt.log.error( err );
				fileDone();
				return;
			}
			grunt.verbose.ok();

			var targetXMLFileName = "entries_tmp/" + path.basename( fileName );

			grunt.file.write( targetXMLFileName, pass1result );

			grunt.verbose.write( "Transforming (pass 2: entries2html.xsl) " + fileName + "..." );
			grunt.utils.spawn({
				cmd: "xsltproc",
				args: [ "--xinclude", "entries2html.xsl", targetXMLFileName ]
			}, function( err, pass2result ) {
				if ( err ) {
					grunt.verbose.error();
					grunt.log.error( err );
					fileDone();
					return;
				}
				grunt.verbose.ok();

				var targetHTMLFileName = targetDir + path.basename( fileName );
				targetHTMLFileName = targetHTMLFileName.substr( 0, targetHTMLFileName.length - "xml".length ) + "html";

				grunt.verbose.write( "Syntax highlighting " + targetHTMLFileName + "..." );
				grunt.helper("syntax-highlight", {cmd: pass2result, target: targetHTMLFileName}, function( error, data ) {

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
			});
		});
	}, function() {
		if ( task.errorCount ) {
			grunt.warn( "Task \"" + task.name + "\" failed." );
			taskDone();
			return;
		}
		rimraf.sync( "entries_tmp" );
		grunt.log.writeln( "Built " + files.length + " entries." );
		taskDone();
	});
}