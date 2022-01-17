function handleSubmit() {
			var pass = validator();

			// Stop if the user didn't enter a response
			// If multiple-answer, join all responses and check if that's empty
			// Remove commas left by joining nested arrays in case multiple-answer is nested
			if ( jQuery.trim( validator.guess ) === "" ||
				 ( validator.guess instanceof Array && jQuery.trim( validator.guess.join( "" ).replace(/,/g, '') ) === "" ) ) {
				return false;
			} else {
				guessLog.push( validator.guess );
			}

			// Stop if the form is already disabled and we're waiting for a response.
			if ( jQuery( "#answercontent input" ).not( "#hint" ).is( ":disabled" ) ) {
				return false;
			}

			jQuery( "#throbber" ).show();
			disableCheckAnswer();
			jQuery( "#answercontent input" ).not("#check-answer-button, #hint")
				.attr( "disabled", "disabled" );
			jQuery( "#check-answer-results p" ).hide();

			// Figure out if the response was correct
			if ( pass === true ) {
				jQuery("#happy").show();
				jQuery("#sad").hide();
			} else {
				jQuery("#happy").hide();
				jQuery("#sad").show();

				// Is this a message to be shown?
				if ( typeof pass === "string" ) {
					jQuery( "#check-answer-results .check-answer-message" ).html( pass ).tmpl().show();
				}

				// Show the examples (acceptable answer formats) if available -- we get
				// a lot of issues due to incorrect formats (eg. "3.14159" instead of
				// "3pi", "log(2^5)" instead of "log(32)").
				var examples = jQuery( "#examples" ),
					examplesLink = jQuery( "#examples-show" );
				if ( examplesLink.is( ":visible" ) ) {
					if ( !examples.is( ":visible" ) ) {
						examplesLink.click();
					}
					examples.effect( "pulsate", { times: 1 }, "slow" );
				}

				// Refocus text field so user can type a new answer
				if ( lastFocusedSolutionInput != null ) {
					setTimeout( function() {
						var focusInput = jQuery( lastFocusedSolutionInput );

						if (!focusInput.is(":disabled")) {
							// focus should always work; hopefully select will work for text fields
							focusInput.focus();
							if (focusInput.is("input:text")) {
								focusInput.select();
							}
						}
					}, 1 );
				}
			}

			// The user checked to see if an answer was valid

			// Save the problem results to the server
			var curTime = new Date().getTime();
			var data = buildAttemptData(pass, ++attempts, JSON.stringify(validator.guess), curTime);
			request( "problems/" + problemNum + "/attempt", data, function() {

				// TODO: Save locally if offline
				jQuery(Khan).trigger( "answerSaved" );

				jQuery( "#throbber" ).hide();
				enableCheckAnswer();

				// If in review mode, the server may decide the user needs to practice
				// this exercise again -- provide quick feedback if so.
				maybeEnqueueReviewProblems();
			}, function() {
				// Error during submit. Cheat, for now, and reload the page in
				// an attempt to get updated data.

				if ( typeof userExercise === "undefined" || !userExercise.tablet ) {
					if ( user != null && exerciseName != null ) {
						// Before we reload, clear out sessionStorage's UserExercise.
						// If there' a discrepancy between server and sessionStorage such that
						// problem numbers are out of order or anything else, we want
						// to restart with whatever the server sends back on reload.
						delete window.sessionStorage[ "exercise:" + user + ":" + exerciseName ];
					}

					window.location.reload();
				} else {
					// TODO: Implement alternative error handling
				}
			}, "attempt_hint_queue" );

			if ( pass === true ) {
				// Correct answer, so show the next question button.
				jQuery( "#check-answer-button" ).hide();
				if ( !testMode || Khan.query.test == null ) {
					jQuery( "#next-question-button" )
						.removeAttr( "disabled" )
						.removeClass( "buttonDisabled" )
						.show()
						.focus();
				}
				nextProblem( 1 );
			} else {
				// Wrong answer. Enable all the input elements, but wait until
				// until server acknowledges before enabling the check answer
				// button.
				jQuery( "#answercontent input" ).not( "#check-answer-button, #hint" )
					.removeAttr( "disabled" );
			}

			// Remember when the last action was
			lastAction = curTime;

			jQuery(Khan).trigger( "checkAnswer", pass );

			return false;
		}