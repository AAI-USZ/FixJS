function( result ) {
				var testStatus = result.length && ( result[0].TESTSTATUS || result[0].testStatus );

				$test.removeClass( ".test-running" );
				if ( testStatus ) {
					$test
						.addClass( testStatus )
						.find( ".test-result" )
							.html( testStatus );

					switch( testStatus ) {
						case "Passed" : $passCount.html( parseInt( $passCount.html() )+1 ); break;
						case "Failed" : $failCount.html( parseInt( $failCount.html() )+1 ); break;
						default : $errorCount.html( parseInt( $errorCount.html() )+1 ); break;
					}
				} else {
					$test
						.addClass( "processing-error" )
						.find( ".test-result" )
							.html( "Processing Error" );
				}

				currentTest++;
				runTest();
			}