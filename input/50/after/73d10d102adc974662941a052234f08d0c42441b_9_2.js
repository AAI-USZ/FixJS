function (oldString, newString) {
		var diffs;
		console.time("diffs");
		diffs = dmp.diff_main(oldString, newString);
		console.timeEnd("diffs");
		return dmp.diff_levenshtein(diffs);
	}