function (filterValue) {
		var regex = new RegExp(filterValue, 'mi');

		_.each(this.sortedIssues(), function (issue) {
			var tags = issue.tags().join(' ');
			if (!filterValue || regex.test(issue.description() + tags)) {
				issue.filtered(false);
			} else {
				issue.filtered(true); // no match, so hide
			}
		});
	}