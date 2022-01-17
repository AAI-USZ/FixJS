function (response) {
					var elapsed = (new Date) - starttime;
					// We accept a slight delay to accomodate minor lags in
					// exection. We use (elapsed - 5000) and not
					// Math.abs(elapsed - 5000) however because we never
					// expect the callback to be invoked before the 5 second
					// timeout window
					var grace = 20; // ... it is *amazing*
					
					ok(
						(elapsed - timeout) < grace,
						str('												  \
							Check that the repository manager times-out on a  \
							repository that was taking more than the allowed  \
							' + timeout + ' +/= ' + grace + ' milliseconds to \
							fullfill a getChildren call.\nThis callback was	  \
							invoked after ' + elapsed + ' milliseconds.		  \
						')
					);
					
					ok(
						elapsed >= timeout,
						str('												  \
							Check that repository manager waited at least the \
							expected ' + timeout + ' milliseconds for		  \
							repositories to respond before automatically	  \
							invoking the callback function.\nThe manager	  \
							waited ' + elapsed + ' milliseconds.			  \
						')
					);
					
					starttime = new Date;
					
					manager.getChildren({
						// Make sure the repository finish before the timeout
						delay : timeout / 2
					}, function (response) {
						var elapsed = ((new Date ) - starttime);
						ok(
							elapsed < 5000,
							str(
								'Check that the repository manager invoked	  \
								this callback before the timeout was reached. \
								\nThis callback was invoked after ' + elapsed +
								' milliseconds.'
							)
						);
						
						start();
						
						runNextTest();
					});
				}