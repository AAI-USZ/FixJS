function( suite, name, totalAssertions, passedAssertions, failedAssertions, skippedAssertions ){
            status.specs++;
            status.failed += failedAssertions;
            status.passed += passedAssertions;
            status.total += totalAssertions;
            status.skipped += skippedAssertions;
            grunt.verbose.write( suite + ' : ' + name + '...' );
            // Log errors if necessary, otherwise success.
            if( failedAssertions > 0 ){
                // list assertions
                if( grunt.option( 'verbose' ) ){
                    grunt.log.error();
                }else{
                    grunt.log.write( 'F'.red );
                }
            }else if( skippedAssertions > 0 ){
                if( grunt.option( 'verbose' ) ){
                    grunt.log.warn();
                }else{
                    grunt.log.write( '*'.red );
                }
            }else{
                grunt.verbose.ok().or.write( '.'.green );
            }
        }