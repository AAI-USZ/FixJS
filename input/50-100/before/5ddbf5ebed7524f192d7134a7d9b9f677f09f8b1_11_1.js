function() {
		var applet = document.getElementById("inferenceApplet" + this.id);


		if (this.food.length) {
			var ret = applet.feed(bugfixParam(decodeString(this.food)));

			myLogger.Log(this.name + " feed: " + ret);
		};
	}