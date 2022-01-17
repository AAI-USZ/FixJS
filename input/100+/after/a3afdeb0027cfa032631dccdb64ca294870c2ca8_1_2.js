function(example) {
	var li = document.getElementById("example_" + example.id);
	li.className = example.exception ? "exception" : "success";

	if(example.exception) {
		var div = document.createElement("DIV");
		div.innerHTML = example.exception.message + "<p><br />" + " at " + example.exception.fileName + ", line " + example.exception.lineNumber + "</p>";
		li.appendChild(div);
	}

	var title = document.getElementById("title");
	var runner = JSSpec.runner;

	title.className = runner.hasException() ? "exception" : "success";

	this.finishedExamples++;
	document.getElementById("total_failures").innerHTML = runner.getTotalFailures();
	document.getElementById("total_errors").innerHTML = runner.getTotalErrors();
	var progress = parseInt(this.finishedExamples / runner.totalExamples * 100);
	document.getElementById("progress").innerHTML = progress;
	document.getElementById("total_elapsed").innerHTML = (new Date().getTime() - this.startedAt.getTime()) / 1000;

	document.title = progress + "%: " + this._title;

	// Also log to console, so we can pick this up in PhantomJS
	var logResult = {
		error: !!example.isError(),
		failure: !!example.isFailure(),
		ok: !(example.isError() || example.isFailure()),
		context: example.context,
		name: example.name,
		exception: example.exception && { message: example.exception.message, file: example.exception.fileName, line: example.exception.lineNumber }
	}
	console.log("Result: " + JSON.stringify(logResult));
}