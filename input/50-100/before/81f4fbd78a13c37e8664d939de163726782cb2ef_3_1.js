function (el, type, fn) {
		if (typeof el === 'string') {
			// el.removeEvents below apperantly calls this method again. Do not quite understand why, so for now just bail out.
			return;
		}
		win.HighchartsAdapter.extendWithEvents(el);
		if (type) {
			if (type === 'unload') { // Moo self destructs before custom unload events
				type = 'beforeunload';
			}

			if (fn) {
				el.removeEvent(type, fn);
			} else {
				el.removeEvents(type);
			}
		} else {
			el.removeEvents();
		}
	}