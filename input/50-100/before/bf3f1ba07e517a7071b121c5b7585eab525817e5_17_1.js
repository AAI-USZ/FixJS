function (args, resolve) {
	var win = args[0], fail = args[1];
	return back.then.call(this, (!this.failed && isFunction(win)) ?
			match.call(win) : win, fail, resolve);
}