function (distance, stringA, stringB) {
		var editDistance = CSLEDIT.diff.customEditDistance(stringA, stringB),
			matchQuality = Math.max(0, Math.floor(100 * (1.0 - editDistance /
				(2 * (stringA + stringB).length)))),
			closeness;

		if (editDistance === 0) {
			closeness = "Perfect match!";
		} else {
			closeness = matchQuality + "% match";
		}

		return '<td class="closeness match">' + closeness + '</td>';
	}