function (id, url, callback) {
			// in this context, id is Tab object instance.
			targets.push({tab:id, startUrl:id.url, callback:callback});
			startTimer();
			return true;
		}