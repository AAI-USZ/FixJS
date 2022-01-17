function (filterValue) {
		filterValue = filterValue.trim();

		// supports tag:<tag>
		if (filterValue.substr(0,4) === 'tag:') {
			var tag = filterValue.substr(4);
			_.each(this.sortedIssues(), function (issue) {
				issue.filtered(!_.include(issue.tags(), tag));
			});
			return;
		}

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