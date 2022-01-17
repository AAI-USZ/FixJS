function (id, url, callback) {
			// in this context, id is Tab object instance.
			targets.push({tab:id, startUrl:url, callback:callback});
			startTimer();
			return true;
		}