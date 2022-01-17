function(e) {
				return jsv.debugMode ? ("<br/><b>Error:</b> <em> " + (e.message || e) + ". </em>") : '""';
			}