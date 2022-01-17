function(){
        var timeout = grunt.config( ['jasmine', this.target, 'timeout'] );

        if( typeof timeout === "undefined" ){
            timeout = 10000;
        }

        // Get files as URLs.
        var urls = grunt.file.expandFileURLs( this.file.src );

        // This task is asynchronous.
        var done = this.async();

        // Reset status.
        status = {failed : 0, passed : 0, total : 0, skipped : 0, specs : 0, duration : 0};

        // Process each filepath in-order.
        grunt.utils.async.forEachSeries( urls, function( url, next ){
            var basename = path.basename( url );
            grunt.verbose.subhead( 'Running specs for ' + basename ).or.write( 'Running specs for ' + basename );
            grunt.log.writeln();

            // Create temporary file to be used for grunt-phantom communication.
            var tempfile = new Tempfile();
            // Timeout ID.
            var id;
            // The number of tempfile lines already read.
            var n = 0;

            // Clean up.
            function cleanup(){
                clearTimeout( id );
                tempfile.unlink();
            }

            // It's simple. As Jasmine tests, assertions and modules begin and complete,
            // the results are written as JSON to a temporary file. This polling loop
            // checks that file for new lines, and for each one parses its JSON and
            // executes the corresponding method with the specified arguments.
            (function loopy(){
                // Disable logging temporarily.
                grunt.log.muted = true;
                // Read the file, splitting lines on \n, and removing a trailing line.
                var lines = grunt.file.read( tempfile.path ).split( '\n' ).slice( 0, -1 );
                // Re-enable logging.
                grunt.log.muted = false;
                // Iterate over all lines that haven't already been processed.
                var done = lines.slice( n ).some( function( line ){
                    // Get args and method.
                    var args = JSON.parse( line );
                    var method = args.shift();
                    // Execute method if it exists.
                    if( phantomHandlers[method] ){
                        phantomHandlers[method].apply( null, args );
                    }
                    // If the method name started with test, return true. Because the
                    // Array#some method was used, this not only sets "done" to true,
                    // but stops further iteration from occurring.
                    return (/^done/).test( method );
                } );

                if( done ){
                    // All done.
                    grunt.log.writeln();
                    cleanup();
                    next();
                }else{
                    // Update n so previously processed lines are ignored.
                    n = lines.length;
                    // Check back in a little bit.
                    id = setTimeout( loopy, 100 );
                }
            }());

            // Launch PhantomJS.
            grunt.helper( 'phantomjs', {
                code : 90,
                args : [
                    // The main script file.
                    grunt.task.getFile( 'jasmine/phantom-jasmine-runner.js' ),
                    // The temporary file used for communications.
                    tempfile.path,
                    // The Jasmine helper file to be injected.
                    grunt.task.getFile( 'jasmine/jasmine-helper.js' ),
                    // URL to the Jasmine .html test file to run.
                    url,
                    timeout,
                    // PhantomJS options.
                    '--config=' + grunt.task.getFile( 'jasmine/phantom-config.json' )
                ],
                done : function( err ){
                    if( err ){
                        cleanup();
                        done();
                    }
                }
            } );
        }, function( err ){
            // All tests have been run.
            // Log results.
            if( status.failed > 0 ){
                grunt.warn( status.failed + '/' + status.total + ' assertions failed in ' + status.specs + ' specs (' +
                                status.duration + 'ms)', Math.min( 99, 90 + status.failed ) );
            }else if( status.skipped > 0 ){
                grunt.warn( status.skipped + '/' + status.total + ' assertions skipped in ' + status.specs + ' specs (' +
                                status.duration + 'ms)', Math.min( 99, 90 + status.skipped ) );
            }else{
                grunt.verbose.writeln();
                grunt.log.ok( status.total + ' assertions passed in ' + status.specs + ' specs (' + status.duration + 'ms)' );
            }

            // All done!
            done();
        } );
    }