function detectReady(evt) {
			if (isReady || (evt && evt.type == "readystatechange" && !readyStates[doc.readyState])) {
				return;
			}
			while (readyQ.length) {
				(readyQ.shift())();
			}
			isReady = 1;
		}