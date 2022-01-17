function (oldString, newString) {
		var diffs = this.dmp.diff_main(oldString, newString);
		this.dmp.diff_cleanupSemantic(diffs);
		return this.prettyHtml(diffs);
	}