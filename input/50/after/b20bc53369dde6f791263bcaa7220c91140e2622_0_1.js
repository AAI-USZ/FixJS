function() {

				// TODO: Save locally if offline
				jQuery(Khan).trigger( "answerSaved" );

				// If in review mode, the server may decide the user needs to practice
				// this exercise again -- provide quick feedback if so.
				maybeEnqueueReviewProblems();
			}