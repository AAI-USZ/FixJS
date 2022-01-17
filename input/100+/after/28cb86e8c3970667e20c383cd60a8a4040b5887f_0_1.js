function( suite, name, totalAssertions, passedAssertions, failedAssertions, skippedAssertions ){
            status.specs++;
            status.failed += failedAssertions;
            status.passed += passedAssertions;
            status.total += totalAssertions;
            status.skipped += skippedAssertions;
            
            var testName = suite + ' : ' + name + '...';
            if( grunt.option( 'verbose' ) ){
	            grunt.log.write( testName );
	            if( failedAssertions > 0 ){
                    grunt.log.error();
	            }else if( skippedAssertions > 0 ){
                    grunt.log.warn();
	            }else{
	            	grunt.log.ok();
	            }
            }else{
	            if( failedAssertions > 0 ){
	            	if( errorReporting ){
			            grunt.log.write( testName.red );
			            grunt.log.error();
	            	}else{
	                    grunt.log.write( 'F'.red );
	                }
	            }else if( skippedAssertions > 0 ){
                    grunt.log.write( '*'.red );
	            }else{
	            	grunt.log.write( '.'.green );
	            }
            }
        }