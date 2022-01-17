function(ev) {

			if ($(Khan).triggerHandler("problemDone") !== false) {

				// If nobody returns false from problemDone indicating
				// that they'll take care of triggering nextProblem,
				// automatically trigger nextProblem.
				$(Khan).trigger("renderNextProblem");

			}

		}