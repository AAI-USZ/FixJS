function (before, after) {
			before = describeValue(before);
			after  = describeValue(after);
			console.log("Done", before, after);
			if (before !== after) {
				before += " ↦ " + after;
			}
			$popup = showValue(before, cursor.line, token.start, token.end, cmLinesNode, cm);
		}