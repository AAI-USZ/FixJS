function (before, after) {
			if (after.details && after.details.location) {
				token.location = after.details.location;
			} else if (before.details && before.details.location) {
				token.location = before.details.location;
			}
			
			before = describeValue(before);
			after  = describeValue(after);
			if (before !== after) {
				before += " ↦ " + after;
			}

			$popup = showValue(before, cursor.line, token.start, token.end, cmLinesNode, cm);
		}