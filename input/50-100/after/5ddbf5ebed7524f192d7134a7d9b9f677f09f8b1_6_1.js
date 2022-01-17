function() {
		var applet = document.getElementById("inferenceApplet" + this.id);

		if (this.food.length) {
			try {
				var ret = applet.feed(bugfixParam(decodeString(this.food)));

				myLogger.Log(this.name + " feed: " + ret);
			} catch (err) {
				myLogger.Log(this.name + " feed error: " + err);
			}
		}
		;
	}