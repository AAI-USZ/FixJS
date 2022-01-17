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

	var totalCount = JSSpec.runner.totalExamples,
		failCount = JSSpec.runner.getTotalFailures(),
		errorCount = JSSpec.runner.getTotalErrors(),
		successCount = totalCount - failCount - errorCount,
		durationSeconds = document.getElementById("total_elapsed").innerHTML,
		message = durationSeconds + " seconds, " + totalCount + " examples (" + successCount + " succeeded, " + failCount + " failed, " + errorCount + " errored)";
	console.log("Finished: " + message);
}