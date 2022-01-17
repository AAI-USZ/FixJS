function(e) {
		var action, func, key, match, ascii;

		if (self.frozen || e.ctrlKey || e.metaKey || e.altKey) {
			return;
		}

		self.reportError (false);

		key = e.keyCode;
		if (key >= 65 && key <= 90) {
			key = String.fromCharCode (key);
		} else {
			key = mapping[key] || key;
		}

		if (e.shiftKey) {
			key = "Shift" + key;
		}

		console.log (key);

		action = self.shortcuts[key];
		func = self[action];

		if (!action || typeof func !== "function") {
			return;
		}

		try {
			func.call (self);
		} catch (e) {
			self.reportError (e.message);
		}

		e.preventDefault ();
		return false;
	}