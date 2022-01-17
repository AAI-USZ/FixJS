function(commit) {
				$("<li/>")
					.text(commit.message)
					.appendTo(versionContainer);
			}