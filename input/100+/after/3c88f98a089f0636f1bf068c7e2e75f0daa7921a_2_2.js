function() {
	var doc = document,
		readyStates = { "loaded": 1, "complete": 1 },
		isReady = !!readyStates[doc.readyState],
		readyQ = [];
console.debug("ready says " + isReady);
	if (!isReady) {
		function detectReady(evt) {
			if (isReady || (evt && evt.type == "readystatechange" && !readyStates[doc.readyState])) {
				return;
			}
console.debug("ready says READY!!!", readyQ.length);
debugger;
			while (readyQ.length) {
				(readyQ.shift())();
			}
			isReady = 1;
		}

		readyQ.concat([
			require.on(doc, "DOMContentLoaded", detectReady),
			require.on(window, "load", detectReady)
		]);

		if ("onreadystatechange" in doc) {
			readyQ.push(require.on(doc, "readystatechange", detectReady));
		} else {
			function poller() {
				readyStates[doc.readyState] ? detectReady() : setTimeout(poller, 30);
			}
			poller();
		}
	}

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

	ready.load = function(name, require, onLoad) {
		ready(onLoad);
	};

	return ready;
}