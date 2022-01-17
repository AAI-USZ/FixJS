function () {
	this.pending = [];
	this.promises = [];
	this.timeout = setTimeout(noop, 1e13);
	this.monitor = createPromise.monitor && createPromise.monitor();
}