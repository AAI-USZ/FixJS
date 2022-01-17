function( result ) {
				var validResult = result.length && result[0].TESTSTATUS;

				$test.removeClass( ".test-running" );
				if ( validResult ) {
					$test
						.addClass( result[0].TESTSTATUS )
						.find( ".test-result" )
							.html( result[0].TESTSTATUS );

					switch( result[0].TESTSTATUS ) {
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