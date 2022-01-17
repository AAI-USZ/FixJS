function() {
		var applet = document.getElementById("efmlApplet");

		/**
		 * grab efml data
		 */
		var efml_parts = myTags.AllTagsBut(this.acceptTags, this.rejectTags);

		var efml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
				+				"<efml>\n";

		for ( var int = 0; int < efml_parts.length; int++) {
			var part = efml_parts[int];

			efml += part.token + "\n";
		}
		
		efml += "</efml>";

		myLogger.Log("EfmlPreviewButton" + this.id + " compile:\n" + efml);

		/**
		 * compile
		 */
		
		try {
			this.lastError = applet.compileEfml(bugfixParam(efml));
		} catch (err) {
			this.lastError = "Error invoking compilation applet: "+err;
		}

		if (this.lastError) {
			myLogger.Log("EfmlPreviewButton" + this.id + " error:\n"
					+ this.lastError);
			return false;
		} else {
			myLogger.Log("EfmlPreviewButton" + this.id + " bounces.");
		}

		/**
		 * set bounce contents
		 */

		this.SetContents(applet.getHtml());

		return true;
	}