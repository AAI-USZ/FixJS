function(i, h) {
						if (fm.file(h).phash == hash) {
							cwd.removeClass(clDropActive);
							return false;
						}
					}