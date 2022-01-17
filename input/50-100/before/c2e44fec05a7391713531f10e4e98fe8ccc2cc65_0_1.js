function(data) {
		if (!data.error) {
			if (p != 1)
				$("<li><hr/></li>")
					.addClass("divider")
					.appendTo(versionContainer);
			
			data.commits.forEach(function(commit) {
				$("<li/>")
					.text(commit.message)
					.appendTo(versionContainer);
			});
			
			loadCommitPage(p+1);
		}
	}