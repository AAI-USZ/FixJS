function(data) {
		if (p == 1) { //TODO!
			if (p != 1)
				$("<li><hr/></li>")
					.addClass("divider")
					.appendTo(versionContainer);
			
			$(data.data).each(function(index, commit) {
				$("<li/>")
					.text(commit.commit.message)
					.appendTo(versionContainer);
			});
			
			loadCommitPage(p+1);
		}
	}