function(index, commit) {
				$("<li/>")
					.text(commit.commit.message)
					.appendTo(versionContainer);
			}