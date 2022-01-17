function (oldString, newString) {
		var diffs = dmp.diff_main(oldString, newString);
		dmp.diff_cleanupSemantic(diffs);
		return prettyHtml(diffs);
	}