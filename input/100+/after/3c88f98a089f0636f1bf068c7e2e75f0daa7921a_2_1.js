function ready(priority, context, callback) {
		var fn, i, l;
		if (!require.is(priority, "Number")) {
			callback = context;
			context = priority;
			priority = 1000;
		}
		fn = callback ? function(){ callback.call(context); } : context;
console.debug("ready()");
console.debug(fn);
		if (isReady) {
			fn();
		} else {
			fn.priority = priority;
			for (i = 0, l = readyQ.length; i < l && priority >= readyQ[i].priority; i++) {}
			readyQ.splice(i, 0, fn);
		}
	}