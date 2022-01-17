function() {
	if(this.testcases.length == 1 && !this.suiteResult.timeoutOccured) {
		//we are done
		this.emit('finished', this.suiteResult);
	}
}