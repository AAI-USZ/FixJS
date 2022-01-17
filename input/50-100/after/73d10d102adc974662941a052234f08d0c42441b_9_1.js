function (oldString, newString) {
		var editDistance = CSLEDIT.diff.customEditDistance(oldString, newString),
			matchQuality = Math.max(0, Math.floor(100 * (1.0 - editDistance /
				Math.max(oldString.length, newString.length))));

		return matchQuality;
	}