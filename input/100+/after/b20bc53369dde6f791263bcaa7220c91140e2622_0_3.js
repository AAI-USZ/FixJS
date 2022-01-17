function(ev) {

			enableCheckAnswer();

			jQuery("#happy").hide();
			if( !jQuery( "#examples-show" ).data( "show" ) ){ jQuery( "#examples-show" ).click(); }

			// Toggle the navigation buttons
			jQuery("#check-answer-button").show();
			jQuery("#next-question-button").blur().hide();

			// Wipe out any previous problem
			jQuery("#workarea").hide();
			jQuery("#workarea, #hintsarea").runModules( problem, "Cleanup" ).empty();
			jQuery("#hint").attr( "disabled", false );

			Khan.scratchpad.clear();

			// Change the title of the exercise, if necessary
			if ( reviewMode && reviewQueue.length ) {
				transitionExerciseTitle();
			}

			if ( testMode && Khan.query.test != null && dataDump.problems.length + dataDump.issues >= problemCount ) {
				// Show the dump data
				jQuery( "#problemarea" ).append(
					"<p>Thanks! You're all done testing this exercise.</p>" +
					"<p>Please copy the text below and send it to us.</p>"
				);

				jQuery( "<textarea>" )
					.val( "Khan.testExercise(" + JSON.stringify( dataDump ) + ");" )
					.css({ width: "60%", height: "200px" })
					.prop( "readonly", true )
					.click( function() {
						this.focus();
						this.select();
					} )
					.appendTo( "#problemarea" );

				jQuery( "#sidebar" ).hide();

			} else {

				// Switch exercises if there's a different queued up exercise in review mode
				if ( reviewMode ) {
					var nextExerciseName = reviewQueue.shift();
					if ( nextExerciseName && nextExerciseName !== exerciseName ) {
						switchToExercise( nextExerciseName );
					}
				}

				// Generate a new problem
				makeProblem();

				// Kick off a request to queue up more exercises if we're running low.
				// This needs to run after makeProblem to get the updated problem state.
				maybeEnqueueReviewProblems();
			}
		}