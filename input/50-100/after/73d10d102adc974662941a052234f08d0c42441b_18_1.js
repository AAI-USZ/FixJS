function (distance, stringA, stringB) {
		var matchQuality = CSLEDIT.diff.matchQuality(stringA, stringB),
			closeness;

		if (matchQuality === 100) {
			closeness = "Perfect match!";
		} else {
			closeness = matchQuality + "% match";
		}

		return '<td class="closeness match">' + closeness + '</td>';
	}