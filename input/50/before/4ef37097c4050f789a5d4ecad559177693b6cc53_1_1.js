function (issue) {
		if (this.userManager.noUser()) {
			return;
		}
		this.issueManager.prioritizeIssue(issue.id);
	}