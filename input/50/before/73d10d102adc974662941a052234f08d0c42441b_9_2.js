function (oldString, newString) {
		var diffs = this.dmp.diff_main(oldString, newString);
		return this.weightedLevenshtein(diffs);
	}