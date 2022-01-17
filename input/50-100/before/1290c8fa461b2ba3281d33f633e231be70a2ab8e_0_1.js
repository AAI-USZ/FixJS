function postInject() {
			prepareSite();

			// Prepare the "random" problems
			if ( !testMode || !Khan.query.problem ) {
				var problems = exercises.children( ".problems" ).children();

				weighExercises( problems );
				problemBag = makeProblemBag( problems, 10 );
			}

			// Generate the initial problem when dependencies are done being loaded
			var answerType = makeProblem();

			maybeEnqueueReviewProblems();
		}