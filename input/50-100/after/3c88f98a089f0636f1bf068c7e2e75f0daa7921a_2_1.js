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