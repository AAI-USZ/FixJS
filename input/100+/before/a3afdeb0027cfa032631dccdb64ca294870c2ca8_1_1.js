function() {
	if(JSSpec.runner.hasException()) {
		var times = 4;
		var title1 = "*" + this._title;
		var title2 = "*F" + JSSpec.runner.getTotalFailures() + " E" + JSSpec.runner.getTotalErrors() + "* " + this._title;
	} else {
		var times = 2;
		var title1 = this._title;
		var title2 = "Success";
	}
	this.blinkTitle(times,title1,title2);
}