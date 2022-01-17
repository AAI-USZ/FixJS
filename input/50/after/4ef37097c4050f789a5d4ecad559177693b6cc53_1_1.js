function (tag) {
		this.issueManager.issueFilterInstant('tag:' + tag);
		$('#issueFilter').focus();
	}