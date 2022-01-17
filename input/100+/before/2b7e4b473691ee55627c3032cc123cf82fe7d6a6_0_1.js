function( err ){
            // All tests have been run.
            // Log results.
            if( status.failed > 0 ){
                grunt.warn( status.failed + '/' + status.total + ' assertions failed in ' + status.specs + ' specs (' +
                                status.duration + 'ms)', Math.min( 99, 90 + status.failed ) );
            }else if( status.skipped > 0 ){
                grunt.warn( status.skipped + '/' + status.total + ' assertions skipped in ' + status.specs + ' specs (' +
                                status.duration + 'ms)', Math.min( 99, 90 + status.failed ) );
            }else{
                grunt.verbose.writeln();
                grunt.log.ok( status.total + ' assertions passed in ' + status.specs + ' specs (' + status.duration + 'ms)' );
            }

            // All done!
            done();
        }